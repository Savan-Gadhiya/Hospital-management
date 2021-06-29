import React from 'react';
import MainRoute from './Routes/MainRoute';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
function App() {
	return (
		<>
			<BrowserRouter>
				<MainRoute />
			</BrowserRouter>
		</>
	);
}

export default App;
