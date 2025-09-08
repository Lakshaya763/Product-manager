import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: function (origin, callback) {
    console.log("🌐 Incoming request from:", origin);

    // Allow requests without origin (Postman, curl)
    if (!origin) return callback(null, true);

    // Allow local development
    if (origin.includes("localhost")) return callback(null, true);

    // Allow deployed frontend on Vercel
    if (origin.includes("vercel.app")) return callback(null, true);

    // Deny all others
    return callback(new Error("❌ Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // include OPTIONS for preflight
  credentials: true,
}));
// ✅ Body parser middleware
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Product Manager API is running.");
});

// ✅ Product routes
app.use("/api/products", productRoutes);

// ✅ Start server after DB connection
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
