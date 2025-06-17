import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import {connectToDatabase} from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL
connectToDatabase().then(r => {

});

// Middleware
app.use(cors({
	origin: "http://localhost:3000", // React dev server
	credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json

// Routes
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

// Root Route (optional)
app.get("/", (req, res) => {
	res.send("Task Manager API is running...");
});

// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
