import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; // ✅ ADD THIS

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// ✅ ENABLE CORS HERE
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

// Production static frontend (currently not serving)
if (process.env.NODE_ENV === "production") {
	console.log("⚠️ Production mode: Frontend not served from backend.");
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at https://localhost:" + PORT);
});
