import pkg from "pg";
import {v4 as uuidv4} from "uuid";
import dotenv from "dotenv";

dotenv.config();
const {Pool} = pkg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL, // or use individual keys: user, host, database, password, port
	ssl: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false,
});

const seed = async () => {
	try {
		const boardId = uuidv4();
		const tasks = [
			{
				id: uuidv4(),
				board_id: boardId,
				name: "Welcome Task",
				description: "Edit or delete this task to get started.",
				status: "todo",
				icon: "👋",
			},
			{
				id: uuidv4(),
				board_id: boardId,
				name: "Add Redux Logic",
				description: "Wire up your front end to manage tasks.",
				status: "in-progress",
				icon: "⚛️",
			},
			{
				id: uuidv4(),
				board_id: boardId,
				name: "Build UI",
				description: "Style the layout with Tailwind.",
				status: "done",
				icon: "🎨",
			},
			{
				id: uuidv4(),
				board_id: boardId,
				name: "Setup API Routes",
				description: "Connect client to the backend.",
				status: "todo",
				icon: "🔗",
			},
		];
		
		await pool.query("BEGIN");
		
		await pool.query(
			"INSERT INTO boards (id, name, description) VALUES ($1, $2, $3)",
			[boardId, "Demo Board", "A demo board with starter tasks"],
		);
		
		for (const task of tasks) {
			await pool.query(
				"INSERT INTO tasks (id, board_id, name, description, status, icon) VALUES ($1, $2, $3, $4, $5, $6)",
				[task.id, task.board_id, task.name, task.description, task.status, task.icon],
			);
		}
		
		await pool.query("COMMIT");
		console.log("✅ Database seeded successfully!");
	} catch (err) {
		await pool.query("ROLLBACK");
		console.error("❌ Seeding failed:", err);
	} finally {
		await pool.end();
	}
};

seed();
