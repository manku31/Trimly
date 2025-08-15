import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";
import { TokenServices } from "../utils/tokenService";
import { EmailService } from "../utils/emailService";

export class BarberController {
  async createBarber(req: Request, res: Response) {
    try {
      const { name, email, phone, password, confirm_Password } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !password || !confirm_Password) {
        return res.status(400).json({
          message: "All required fields must be provided",
        });
      }

      // Check if passwords match
      if (password !== confirm_Password) {
        return res.status(400).json({
          message: "Passwords do not match",
        });
      }

      // Check if barber already exists
      const existingBarber = await prisma.barber.findFirst({
        where: {
          OR: [{ email: email }, { phone: phone }],
        },
      });

      if (existingBarber) {
        return res.status(409).json({
          message: "Barber with this email or phone already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS || "10")
      );

      // Generate OTP
      const otp = EmailService.generateOtp();
      const otpExpiry = EmailService.getOTPExpiry();

      // Create new barber
      const newBarber = await prisma.barber.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          confirm_Password,
          otp,
          otp_expiry: otpExpiry,
        },
        select: {
          barber_id: true,
          name: true,
          email: true,
          phone: true,
          verified: true,
          shopValidation: true,
          createdAt: true,
        },
      });

      // Send OTP email
      const emailSent = await EmailService.sendOTPEmail(email, otp, name);

      if (!emailSent) {
        await prisma.barber.delete({
          where: { barber_id: newBarber.barber_id },
        });
        return res.status(500).json({
          message: "Failed to send verification email. Please try again.",
        });
      }

      return res.status(201).json({
        message:
          "Barber created successfully. Please check your email for OTP verification.",
        barber: newBarber,
        requiresVerification: true,
      });
    } catch (error) {
      console.error("Error creating barber:", error);
      return res.status(500).json({
        message: "Internal server error while creating barber.",
      });
    }
  }

  async verifyBarberOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          message: "Email and OTP are required",
        });
      }

      // Find barber
      const barber = await prisma.barber.findUnique({
        where: { email },
      });

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      if (barber.verified) {
        return res.status(400).json({
          message: "Barber is already verified",
        });
      }

      if (!barber.otp || !barber.otp_expiry) {
        return res.status(400).json({
          message: "No OTP found. Please request a new one.",
        });
      }

      // Check if OTP is expired
      if (EmailService.isOTPExpired(barber.otp_expiry)) {
        return res.status(400).json({
          message: "OTP has expired. Please request a new one.",
        });
      }

      // Verify OTP
      if (barber.otp !== otp) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }

      // Update barber as verified
      const updatedBarber = await prisma.barber.update({
        where: { barber_id: barber.barber_id },
        data: {
          verified: true,
          otp: null,
          otp_expiry: null,
        },
        select: {
          barber_id: true,
          name: true,
          email: true,
          phone: true,
          verified: true,
          shopValidation: true,
          createdAt: true,
        },
      });

      // Generate JWT tokens
      const tokens = TokenServices.generateTokens({
        barber_id: updatedBarber.barber_id,
        email: updatedBarber.email,
      });

      return res.status(200).json({
        message: "Email verified successfully",
        barber: updatedBarber,
        tokens,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({
        message: "Internal server error while verifying OTP.",
      });
    }
  }

  async resendBarberOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const barber = await prisma.barber.findUnique({
        where: { email },
      });

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      if (barber.verified) {
        return res.status(400).json({
          message: "Barber is already verified",
        });
      }

      // Generate new OTP
      const otp = EmailService.generateOtp();
      const otpExpiry = EmailService.getOTPExpiry();

      // Update barber with new OTP
      await prisma.barber.update({
        where: { barber_id: barber.barber_id },
        data: {
          otp,
          otp_expiry: otpExpiry,
        },
      });

      // Send OTP email
      const emailSent = await EmailService.sendOTPEmail(
        email,
        otp,
        barber.name
      );

      if (!emailSent) {
        return res.status(500).json({
          message: "Failed to send verification email. Please try again.",
        });
      }

      return res.status(200).json({
        message: "OTP sent successfully to your email",
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      return res.status(500).json({
        message: "Internal server error while resending OTP.",
      });
    }
  }

  async createShop(req: Request, res: Response) {
    try {
      const { name, address, location, gst_number, barber_id } = req.body;
      const barberId = barber_id;

      // Validate required fields
      if (!name || !address) {
        return res.status(400).json({
          message: "Shop name and address are required",
        });
      }

      // Check if barber is authenticated
      if (!barberId) {
        return res.status(401).json({
          message: "Barber not authenticated",
        });
      }

      // Verify barber exists
      const barber = await prisma.barber.findUnique({
        where: { barber_id: barberId, verified: true },
      });

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      if (!barber.verified) {
        return res.status(403).json({
          message: "Barber must be verified to create a shop",
        });
      }

      // Create new shop
      const newShop = await prisma.shopDetails.create({
        data: {
          barber_id: barberId,
          name,
          address,
          location: location || null,
          gst_number: gst_number || null,
        },
        include: {
          barber: {
            select: {
              barber_id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return res.status(201).json({
        message: "Shop created successfully.",
        shop: newShop,
      });
    } catch (error) {
      console.error("Error creating shop:", error);
      return res.status(500).json({
        message: "Internal server error while creating shop.",
      });
    }
  }

  async loginBarber(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      // Find barber by email
      const barber = await prisma.barber.findUnique({
        where: { email, verified: true },
        include: {
          shopDetails: true,
        },
      });

      // Check if barber exists
      if (!barber) {
        return res.status(404).json({
          message: "Invalid email or password",
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, barber.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Generate JWT tokens
      const tokens = TokenServices.generateTokens({
        barber_id: barber.barber_id,
        email: barber.email,
      });

      // Login the barber
      return res.status(200).json({
        message: "Barber logged in successfully",
        barber: {
          barber_id: barber.barber_id,
          name: barber.name,
          email: barber.email,
          verified: barber.verified,
          shopValidation: barber.shopValidation,
          shops: barber.shopDetails,
        },
        tokens,
      });
    } catch (error) {
      console.error("Error logging in barber:", error);
      return res.status(500).json({
        message: "Internal server error while logging in barber.",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          message: "Refresh token is required",
        });
      }

      // Verify the refresh token
      const decoded = TokenServices.verifyRefreshToken(refreshToken);

      if (decoded.type !== "refresh") {
        return res.status(401).json({
          message: "Invalid token type",
        });
      }

      const barber = await prisma.barber.findUnique({
        where: { barber_id: decoded.barber_id },
      });

      if (!barber) {
        return res.status(404).json({
          message: "barber not found",
        });
      }

      // Generate new tokens
      const tokens = TokenServices.generateTokens({
        barber_id: barber.barber_id,
        email: barber.email,
      });

      return res.status(200).json({
        message: "Tokens refreshed successfully",
        tokens,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Refresh token has expired",
          });
        }
        if (error.name === "JsonWebTokenError") {
          return res.status(401).json({
            message: "Invalid refresh token",
          });
        }
      }

      console.error("Error refreshing token:", error);
      return res.status(500).json({
        message: "Internal server error while refreshing token.",
      });
    }
  }

  async getCurrentBarber(req: Request, res: Response) {
    try {
      const { barber_id } = req.body;
      const barberId = barber_id;

      if (!barberId) {
        return res.status(401).json({
          message: "Barber not authenticated",
        });
      }

      const barber = await prisma.barber.findUnique({
        where: { barber_id: barberId },
        select: {
          barber_id: true,
          name: true,
          email: true,
          phone: true,
          verified: true,
          shopValidation: true,
          createdAt: true,
          shopDetails: true,
        },
      });

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      return res.status(200).json({
        message: "Barber profile retrieved successfully",
        barber,
      });
    } catch (error) {
      console.error("Error getting current barber:", error);
      return res.status(500).json({
        message: "Internal server error while getting barber profile.",
      });
    }
  }
}
