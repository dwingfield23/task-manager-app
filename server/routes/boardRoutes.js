import express from "express";
import {
	createBoard,
	getBoardById,
	updateBoard,
	deleteBoard,
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);
router.get("/:boardId", getBoardById);
router.put("/:boardId", updateBoard);
router.delete("/:boardId", deleteBoard);

export default router;
