import pool from "../db/index.js";

export const updateTask = async (req, res) => {
	const {taskId} = req.params;
	const {name, description, status, icon} = req.body;
	
	try {
		const result = await pool.query(
			"UPDATE tasks SET name = $1, description = $2, status = $3, icon = $4 WHERE id = $5 RETURNING *",
			[name, description, status, icon, taskId],
		);
		
		if (result.rowCount === 0) {
			return res.status(404).json({error: "Task not found"});
		}
		
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Failed to update task"});
	}
};

export const deleteTask = async (req, res) => {
	const {taskId} = req.params;
	
	try {
		const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [taskId]);
		
		if (result.rowCount === 0) {
			return res.status(404).json({error: "Task not found"});
		}
		
		res.status(200).json({message: "Task deleted"});
	} catch (err) {
		console.error(err);
		res.status(500).json({error: "Failed to delete task"});
	}
};
