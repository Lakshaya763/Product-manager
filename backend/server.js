import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === "https://product-manager-vert.vercel.app" ||
      origin.endsWith(".lakshaya-pants-projects.vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
// ✅ Body parser middleware
app.use(express.json());

// ✅ Simple API health check
app.get("/", (req, res) => {
  res.send("✅ Product Manager API is running.");
});

// ✅ Product routes
app.use("/api/products", productRoutes);

// ✅ Start the server after connecting DB
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
