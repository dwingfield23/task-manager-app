import {createSlice, nanoid} from "@reduxjs/toolkit";
/*
 const initialState = [
 {
 id: nanoid(),
 name: "First Task",
 description: "This is your first task",
 icon: "✅",
 status: "Todo",
 },
 {
 id: nanoid(),
 name: "Second Task",
 description: "",
 icon: "📝",
 status: "In Progress",
 },
 {
 id: nanoid(),
 name: "Third Task",
 description: "",
 icon: "🚀",
 status: "Review",
 },
 {
 id: nanoid(),
 name: "Fourth Task",
 description: "",
 icon: "📦",
 status: "Done",
 },
 ];
 //*/
const initialState = {
	list: [
		{
			id: nanoid(),
			name: "First Task",
			description: "This is your first task",
			icon: "✅",
			status: "Todo",
		},
		{
			id: nanoid(),
			name: "Second Task",
			description: "",
			icon: "📝",
			status: "In Progress",
		},
		{
			id: nanoid(),
			name: "Third Task",
			description: "",
			icon: "🚀",
			status: "Review",
		},
		{
			id: nanoid(),
			name: "Fourth Task",
			description: "",
			icon: "📦",
			status: "Done",
		},
	], // Array of tasks
};

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state) => {
			state.push({
				id: nanoid(),
				name: "New Task",
				description: "",
				icon: "",
				status: "Todo",
			});
		},
		updateTask: (state, action) => {
			const index = state.findIndex(task => task.id === action.payload.id);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
		deleteTask: (state, action) => {
			return state.filter(task => task.id !== action.payload);
		},
		setTasks: (state, action) => {
			state.list = action.payload.tasks;
		},
	},
});

export const {
	addTask,
	updateTask,
	deleteTask,
	setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
