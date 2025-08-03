import { prisma } from "../lib/prisma";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Export the prisma instance for database operations
export { prisma };

// Function to connect to database and test connection
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

// Function to disconnect from database (useful for cleanup)
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error);
  }
}
