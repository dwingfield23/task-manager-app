import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import taskReducer from "../features/task/taskSlice";

export const store = configureStore({
	reducer: {
		board: boardReducer,
		tasks: taskReducer,
	},
});
