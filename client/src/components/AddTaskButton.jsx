import {useDispatch} from "react-redux";
import {addTask} from "../features/task/taskSlice";

export default function AddTaskButton () {
	const dispatch = useDispatch();
	
	return (
		<button
			onClick={() => dispatch(addTask())}
			className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
		>
			Add New Task
		</button>
	);
}
