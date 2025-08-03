import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export class UserController {
  testFunc(req: Request, res: Response) {
    console.log("This is a test function of User.");
    return res
      .status(200)
      .json({ message: "User Test function executed successfully." });
  }

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

      // create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          confirm_Password,
          location: location || null,
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

      return res.status(201).json({
        message: "User created successfully.",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Internal server error while creating user.",
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
        where: { email,},
      });

      // Check if user not exists
      if (!user) {
        return res.status(404).json({
          message: "Invalid email or password",
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Login the user
      return res.status(200).json({
        message: "User logged in successfully",
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({
        message: "Internal server error while logging in user.",
      });
    }
  }
}
