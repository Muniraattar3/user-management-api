import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import limiter from "./middlewares/rateLimiter.js";
import cors from "cors";
//import AppError from "./utils/AppError.js";
//import authRoutes from "./routes/authRoutes.js";

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Body parser
app.use(express.json());

// Rate limiter - should come BEFORE routes
app.use(limiter);

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // plural is better



// Global error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("User Management API is running 🚀");
});


export default app;
