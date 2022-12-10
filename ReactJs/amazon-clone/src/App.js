import React, { useEffect, useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CheckoutPage from "./pages/checkout/checkout.page";
import MainPage from "./pages/main/main.page";
import LoginPage from "./pages/login/login.page";
import Header from "./components/Header/Header.component";

import { auth } from "./helpers/firebase/firebase";
import { useStateValue } from "./helpers/context/StateProvider";

import "./App.scss";

function App() {
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		// will only run once when the app component loads...

		auth.onAuthStateChanged((authUser) => {
			console.log("THE USER IS >>> ", authUser);

			if (authUser) {
				// the user just logged in / the user was logged in

				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<div className="app">
				<Header />
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route index path="/" element={<MainPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

