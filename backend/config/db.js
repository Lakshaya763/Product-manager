import mongoose from "mongoose";
import dns from 'dns';
dns.resolveSrv('_mongodb._tcp.cluster0.7nj0s.mongodb.net', (err, addresses) => {
  if (err) console.error("❌ DNS SRV lookup failed:", err);
  else console.log("✅ DNS SRV addresses:", addresses);
});

export const connectDB = async () => {
	try {
		console.log("🛠 Connecting to MongoDB...");
		console.log("🔐 MONGO_URI:", process.env.MONGO_URI);

		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 30000,
			connectTimeoutMS: 10000,
		});

		console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`❌ MongoDB connection error: ${error.message}`);
		process.exit(1);
	}
};
