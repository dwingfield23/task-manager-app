import pool from "../db/index.js";
import {v4 as uuidv4} from "uuid";

export const createBoard = async (req, res) => {
	try {
		const id = uuidv4();
		const {name = "Untitled Board", description = ""} = req.body;
		
		const result = await pool.query(
			"INSERT INTO boards (id, name, description) VALUES ($1, $2, $3) RETURNING *",
			[id, name, description],
		);
		
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Failed to create board"});
	}
};

export const getBoardById = async (req, res) => {
	const {boardId} = req.params;
	
	try {
		const boardResult = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);
		const taskResult = await pool.query("SELECT * FROM tasks WHERE board_id = $1", [boardId]);
		
		if (boardResult.rowCount === 0) {
			return res.status(404).json({error: "Board not found"});
		}
		
		res.status(200).json({
			...boardResult.rows[0],
			tasks: taskResult.rows,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Failed to fetch board"});
	}
};

export const updateBoard = async (req, res) => {
	const {boardId} = req.params;
	const {name, description} = req.body;
	
	try {
		const result = await pool.query(
			"UPDATE boards SET name = $1, description = $2 WHERE id = $3 RETURNING *",
			[name, description, boardId],
		);
		
		if (result.rowCount === 0) {
			return res.status(404).json({error: "Board not found"});
		}
		
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Failed to update board"});
	}
};

export const deleteBoard = async (req, res) => {
	const {boardId} = req.params;
	
	try {
		await pool.query("DELETE FROM tasks WHERE board_id = $1", [boardId]);
		const result = await pool.query("DELETE FROM boards WHERE id = $1 RETURNING *", [boardId]);
		
		if (result.rowCount === 0) {
			return res.status(404).json({error: "Board not found"});
		}
		
		res.status(200).json({message: "Board and tasks deleted"});
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Failed to delete board"});
	}
};
