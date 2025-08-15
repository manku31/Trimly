import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";
import { TokenServices } from "../utils/tokenService";
import { EmailService } from "../utils/emailService";

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, phone, password, confirm_Password, location } =
        req.body;

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

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { phone: phone }],
        },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "User with this email or phone already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS || "10")
      );

      const otp = EmailService.generateOtp();
      const otpExpiry = EmailService.getOTPExpiry();

      // create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          confirm_Password,
          location: location || null,
          otp,
          otp_expiry: otpExpiry,
        },
        select: {
          user_id: true,
          name: true,
          email: true,
          phone: true,
          location: true,
          verified: true,
          createdAt: true,
        },
      });

      const emailSent = await EmailService.sendOTPEmail(email, otp, name);

      if (!emailSent) {
        await prisma.user.delete({ where: { user_id: newUser.user_id } });
        return res.status(500).json({
          message: "Failed to send verification email. Please try again.",
        });
      }

      return res.status(201).json({
        message:
          "User created successfully. Please check your email for OTP verification.",
        user: newUser,
        requiresVerification: true,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Internal server error while creating user.",
      });
    }
  }

  async verifyUserOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      // Validate required fields
      if (!email || !otp) {
        return res.status(400).json({
          message: "Email and OTP are required",
        });
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.verified) {
        return res.status(400).json({
          message: "User is already verified",
        });
      }

      if (!user.otp || !user.otp_expiry) {
        return res.status(400).json({
          message: "No OTP found. Please request a new one.",
        });
      }

      // Check if OTP is expired
      if (EmailService.isOTPExpired(user.otp_expiry)) {
        return res.status(400).json({
          message: "OTP has expired. Please request a new one.",
        });
      }

      // Verify OTP
      if (user.otp !== otp) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }

      // Update user as verified
      const updatedUser = await prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          verified: true,
          otp: null,
          otp_expiry: null,
        },
        select: {
          user_id: true,
          name: true,
          email: true,
          phone: true,
          location: true,
          verified: true,
          createdAt: true,
        },
      });

      // Generate JWT tokens
      const tokens = TokenServices.generateTokens({
        user_id: updatedUser.user_id,
        email: updatedUser.email,
      });

      return res.status(200).json({
        message: "Email verified successfully",
        user: updatedUser,
        tokens,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({
        message: "Internal server error while verifying OTP.",
      });
    }
  }

  async resendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.verified) {
        return res.status(400).json({
          message: "User is already verified",
        });
      }

      // Generate new OTP
      const otp = EmailService.generateOtp();
      const otpExpiry = EmailService.getOTPExpiry();

      // Update user with new OTP
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          otp,
          otp_expiry: otpExpiry,
        },
      });

      // Send OTP email
      const emailSent = await EmailService.sendOTPEmail(email, otp, user.name);

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

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email, verified: true },
      });

      // Check if user not exists
      if (!user) {
        return res.status(404).json({
          message: "Invalid email or password",
        });
      }

      // Check if user is verified
      if (!user.verified) {
        return res.status(403).json({
          message: "Please verify your email before logging in",
          requiresVerification: true,
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Generate JWT tokens
      const tokens = TokenServices.generateTokens({
        user_id: user.user_id,
        email: user.email,
      });

      // Login the user
      return res.status(200).json({
        message: "User logged in successfully",
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        },
        tokens,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({
        message: "Internal server error while logging in user.",
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

      const user = await prisma.user.findUnique({
        where: { user_id: decoded.user_id },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Generate new tokens
      const tokens = TokenServices.generateTokens({
        user_id: user.user_id,
        email: user.email,
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

  async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = req.user?.user_id;

      if (!userId) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }

      const user = await prisma.user.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          name: true,
          email: true,
          phone: true,
          location: true,
          verified: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "User profile retrieved successfully",
        user,
      });
    } catch (error) {
      console.error("Error getting current user:", error);
      return res.status(500).json({
        message: "Internal server error while getting user profile.",
      });
    }
  }
}
