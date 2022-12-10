import React, { useEffect } from "react";

import Header from "./components/header/header.component";
import WeatherInput from "./components/weather-input/weather-input.component";
import WeatherInfo from "./components/weather-info/weather-info.component";
import Footer from "./components/footer/footer.component";

import "dayjs/locale/en";
import dayjs from "dayjs";

import { reverseGeoSearch } from "./helpers/geocode/geo-search";

import { useStateValue } from "./helpers/context/stateprovider";

import "./App.scss";

function App() {
	// eslint-disable-next-line
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		dayjs.locale("en");

		const getLocation = () => {
			const haveLocation = navigator.geolocation;

			if (haveLocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					const { latitude, longitude } = position.coords;

					dispatch({ type: "SET_LOCATION", location: { latitude, longitude } });

					const data = await reverseGeoSearch({ latitude, longitude });

					dispatch({
						type: "SET_ADDRESS",
						address: {
							street: data.address.road,
							city: data.address.city,
							state: data.address.state,
							country: data.address.country,
						},
					});
				});
			}
		};

		getLocation();
	}, [dispatch]);

	return (
		<div className="App">
			<Header />
			<WeatherInput />
			<WeatherInfo />
			<Footer />
		</div>
	);
}
// }

export default App;

