import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.component";
import Login from "./components/Login/Login.component";
import Checkout from "./components/Checkout/Checkout.component";
import Home from "./components/Home/Home.component";
import Payment from "./components/Payment/Payment.component";

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
	}, [dispatch]);

	return (
		<Router>
			<div className="app">
				<Header />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/payment" element={<Payment />} />
					<Route index path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

