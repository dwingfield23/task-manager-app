import {useDispatch, useSelector} from "react-redux";
import {updateBoardName, updateBoardDescription} from "../features/board/boardSlice";

export default function BoardHeader () {
	const dispatch = useDispatch();
	const {name, description, tasks} = useSelector(state => state.board);
	
	return (
		<div className="mb-4">
			<input
				value={name}
				onChange={(e) => dispatch(updateBoardName(e.target.value))}
				className="text-3xl font-bold border-b border-gray-300 focus:outline-none w-full"
			/>
			<textarea
				value={description}
				onChange={(e) => dispatch(updateBoardDescription(e.target.value))}
				placeholder="Add a board description..."
				className="mt-2 text-gray-600 w-full border border-gray-200 rounded p-2"
			/>
		</div>
	);
}
