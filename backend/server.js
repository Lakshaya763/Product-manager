import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://product-manager-vert.vercel.app",
  "https://product-manager-4qgk2uc21-lakshaya-pants-projects.vercel.app",
  "https://product-manager-8uedf4uw8-lakshaya-pants-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.get("/", (req, res) => {
	res.send("✅ Product Manager API is running.");
});
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log("✅ Server started at http://localhost:" + PORT);
});
