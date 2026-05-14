import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
const getOrigin = (url) => {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch (error) {
    return url;
  }
};

const allowedOrigins = [
  getOrigin(process.env.FRONTEND_URL),
  "https://task-manager-frontend-delta-seven.vercel.app",
  "https://task-manager-frontend-cia97b7hg-harshits-projects3.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV === "production") {
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
