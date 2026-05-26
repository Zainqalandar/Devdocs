import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/database";

const PORT = parseInt(process.env.PORT || "5000", 10);

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🚀  DevDocs API Server started`);
    console.log(`📡  Port      : ${PORT}`);
    console.log(`🌍  Mode      : ${process.env.NODE_ENV || "development"}`);
    console.log(`🔗  Base URL  : http://localhost:${PORT}`);
    console.log(`📖  API Docs  : http://localhost:${PORT}/api`);
    console.log(`📘  Swagger   : http://localhost:${PORT}/api-docs`);
    console.log(`❤️   Health    : http://localhost:${PORT}/health`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      const { disconnectDB } = await import("./config/database");
      await disconnectDB();
      console.log("✅ Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled Promise Rejection:", reason);
    server.close(() => process.exit(1));
  });
};

startServer();
