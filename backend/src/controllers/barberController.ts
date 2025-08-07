import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";
import { TokenServices } from "../utils/tokenService";

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

      // Create new barber
      const newBarber = await prisma.barber.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          confirm_Password,
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
        barber_id: newBarber.barber_id,
        email: newBarber.email,
      });

      return res.status(201).json({
        message: "Barber created successfully.",
        barber: newBarber,
        tokens,
      });
    } catch (error) {
      console.error("Error creating barber:", error);
      return res.status(500).json({
        message: "Internal server error while creating barber.",
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
        where: { barber_id: barberId },
      });

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
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
        where: { email },
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

  async getCurrentBarber(req: Request, res: Response) {
    try {
      const { barber_id} = req.body;
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
