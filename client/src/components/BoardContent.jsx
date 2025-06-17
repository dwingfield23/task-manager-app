import {useDispatch, useSelector} from "react-redux";

import TaskCard from "../components/TaskCard";

export default function BoardContent () {
	const dispatch = useDispatch();
	const {list} = useSelector(state => state.tasks);
	
	return (
		<div>
			{list.map(task => (
				<TaskCard key={task.id} task={task}/>
			))}
		</div>
	);
}
