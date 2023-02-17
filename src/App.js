import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Main from "./pages/Main";
import Email from "./pages/Email";

import "./styles/reset.css";

function App() {
	return (
		<>
			<BrowserRouter>
					<Routes>
						<Route path="/" element={<Email />} />
					</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
