import {useDispatch} from "react-redux";
import {updateTask, deleteTask} from "../features/task/taskSlice";

export default function TaskCard ({task}) {
	const dispatch = useDispatch();
	
	const handleChange = (field, value) => {
		dispatch(updateTask({...task, [field]: value}));
	};
	
	return (
		<div className="bg-white shadow rounded p-4 mb-4">
			<div className="flex items-center justify-between mb-2">
				<input
					value={task.name}
					onChange={(e) => handleChange("name", e.target.value)}
					className="font-semibold text-lg w-full mr-2 border-b"
				/>
				<button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500">Delete</button>
			</div>
			<textarea
				value={task.description}
				onChange={(e) => handleChange("description", e.target.value)}
				placeholder="Task description..."
				className="w-full border rounded p-2 text-sm"
			/>
			<input
				value={task.icon}
				onChange={(e) => handleChange("icon", e.target.value)}
				placeholder="Icon (e.g. ✅)"
				className="mt-2 w-full border p-1 text-sm"
			/>
			<input
				value={task.status}
				onChange={(e) => handleChange("status", e.target.value)}
				placeholder="Status (e.g. Todo)"
				className="mt-2 w-full border p-1 text-sm"
			/>
		</div>
	);
}
