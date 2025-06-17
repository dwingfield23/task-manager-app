import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	id: null,
	name: "Untitled Board",
	description: "",
};

const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		setBoard: (state, action) => {
			const {id, name, description} = action.payload;
			state.id = id;
			state.name = name;
			state.description = description;
		},
		updateBoardName: (state, action) => {
			state.name = action.payload;
		},
		updateBoardDescription: (state, action) => {
			state.description = action.payload;
		},
	},
});

export const {
	setBoard,
	updateBoardName,
	updateBoardDescription,
} = boardSlice.actions;

export default boardSlice.reducer;
