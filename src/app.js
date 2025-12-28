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
  origin:[  "http://localhost:5173",
      "https://auth-client-53qh.vercel.app"],
  credentials: true
}));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

// Body parser
app.use(express.json());


// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // plural is better

app.use(limiter);

// Global error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("User Management API is running 🚀");
});


export default app;
