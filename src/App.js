import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";

import "./styles/reset.css";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
