import express from "express";
import {
	updateTask,
	deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
