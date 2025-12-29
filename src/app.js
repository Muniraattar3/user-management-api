import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import limiter from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://auth-client-4lyzpvjqa-munira-attars-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
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
