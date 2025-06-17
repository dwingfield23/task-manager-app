import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import Header from "../components/Header";
import BoardHeader from "../components/BoardHeader";

import AddTaskButton from "../components/AddTaskButton";
import BoardContent from "../components/BoardContent";

import {fetchBoard} from "../api/boardApi";

import {setBoard} from "../features/board/boardSlice";
import {setTasks} from "../features/task/taskSlice";

const BoardPage = () => {
	const dispatch = useDispatch();
	
	const {boardId} = useParams(); // expects route: /board/:boardId
	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	
	useEffect(() => {
		async function fetchData () {
			try {
				const data = await fetchBoard(boardId);
				dispatch(setBoard(data));
				dispatch(setTasks(data));
			} catch (err) {
				console.log("err.message", err.message);
				//setError(err.message);
			} finally {
				//setLoading(false);
			}
		}
		
		fetchData().then(r => {
		
		});
	}, [boardId]);
	
	return (
		<div className="max-w-6xl mx-auto mt-8 px-4">
			<Header/>
			
			<div className="grid grid-cols-3 grid-rows-1 gap-2">
				
				<div className="col-span-2">
					<BoardHeader/>
					<BoardContent/>
					<AddTaskButton/>
				</div>
				
				<div>&nbsp;</div>
			
			</div>
		
		</div>
	);
};

export default BoardPage;
