import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import limiter from "./middlewares/rateLimiter.js";

const app = express();

// 1️⃣ Enable CORS
const allowedOrigins = [
  "http://localhost:5173",                // Vite dev
  "https://auth-client-53qh.vercel.app"  // Vercel frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// 2️⃣ Body parser
app.use(express.json());

// 3️⃣ Routes
app.use("/api/users", userRoutes);

// 4️⃣ Rate limiter (after routes)
app.use(limiter);

// 5️⃣ Global error handler
app.use(errorHandler);

export default app;
