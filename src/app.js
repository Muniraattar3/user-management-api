import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import limiter from "./middlewares/rateLimiter.js";

const app = express();

// ✅ CORS — SIMPLE & SAFE
app.use(cors({
  origin:"*",
  methods:["GET", "POST","PUT","DELETE"],
}));

// Body parser
app.use(express.json());


// Routes
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("User Management API running 🚀");
});
app.use(limiter);
// Error handler
app.use(errorHandler);

export default app;
