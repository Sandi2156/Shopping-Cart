import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
	return (
		<ShoppingCartProvider>
			<Navbar />
			<Container className="mb-4">
				<div className="App">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/store" element={<Store />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</div>
			</Container>
		</ShoppingCartProvider>
	);
}

export default App;
