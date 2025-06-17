import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import BoardPage from "./pages/BoardPage";

function App () {
	
	return (
		<Router>
			<Routes>
				<Route path="/" element={<BoardPage/>}/>
				<Route path="/board/:boardId" element={<BoardPage/>}/>
			</Routes>
		</Router>
	);
}

export default App;
