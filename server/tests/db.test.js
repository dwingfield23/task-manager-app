//import {Pool} from "pg";
import pkg from "pg";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";

dotenv.config({path: ".env.test"});

const {Pool} = pkg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
	await pool.query("BEGIN");
});

afterAll(async () => {
	await pool.query("ROLLBACK");
	await pool.end();
});

describe("Database: Boards and Tasks", () => {
	let boardId;
	
	it("should insert a board", async () => {
		boardId = uuidv4();
		const res = await pool.query(
			"INSERT INTO boards (id, name, description) VALUES ($1, $2, $3) RETURNING *",
			[boardId, "Test Board", "Board for testing"],
		);
		
		expect(res.rows.length).toBe(1);
		expect(res.rows[0].name).toBe("Test Board");
	});
	
	it("should insert a task for that board", async () => {
		const taskId = uuidv4();
		const res = await pool.query(
			"INSERT INTO tasks (id, board_id, name, description, status, icon) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[taskId, boardId, "Test Task", "Task desc", "todo", "📌"],
		);
		
		expect(res.rows[0].board_id).toBe(boardId);
		expect(res.rows[0].status).toBe("todo");
	});
	
	it("should retrieve the board with tasks", async () => {
		const boardRes = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);
		const taskRes = await pool.query("SELECT * FROM tasks WHERE board_id = $1", [boardId]);
		
		expect(boardRes.rows[0].id).toBe(boardId);
		expect(taskRes.rows.length).toBeGreaterThanOrEqual(1);
	});
});
