import app from "./app";
import { connectDatabase, disconnectDatabase } from "./db/db";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down server...");
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    });

    process.on("SIGTERM", async () => {
      console.log("\n🛑 Shutting down server...");
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
