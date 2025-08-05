import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import handlers and middleware
import { setupSocketHandlers } from "./socket-handler";
import { authMiddleware } from "./middleware/auth";
import { errorHandler } from "./middleware/error-handler";

// Import API routes
import authRoutes from "./api/auth";
import gamesRoutes from "./api/games";
import usersRoutes from "./api/users";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/xogos-among-us";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/games", authMiddleware, gamesRoutes);
app.use("/api/users", authMiddleware, usersRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", serverTime: new Date().toISOString() });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Serve the frontend build
  app.use(express.static(path.join(__dirname, "../../.next")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../.next/index.html"));
  });
}

// Error handling middleware
app.use(errorHandler);

// Set up Socket.IO handlers
setupSocketHandlers(io);

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server is running`);
});

// Handle server shutdown
const shutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });

  // If server doesn't close in 5 seconds, force shutdown
  setTimeout(() => {
    console.error("Server shutdown timed out, forcing exit");
    process.exit(1);
  }, 5000);
};

// Handle process termination
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export { app, server, io };
