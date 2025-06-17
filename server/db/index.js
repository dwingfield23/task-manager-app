import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pg;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false,
});

export const connectToDatabase = async () => {
	try {
		await pool.connect();
		console.log("✅ Connected to PostgreSQL database");
	} catch (error) {
		console.error("❌ PostgreSQL connection error:", error);
		process.exit(1);
	}
};

export default pool;
