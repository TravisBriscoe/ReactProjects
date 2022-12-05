import React, { useState, useEffect } from "react";
import { useOpenWeather } from "react-open-weather";

import "dayjs/locale/en";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";

import { setLocation, myLocation } from "./redux/reducers/location";
import { myAddress, setGeocode } from "./redux/reducers/geocode";
import { myUnit, setUnit } from "./redux/reducers/unit";

import LittleEarth from "./assets/little-earth.png";

import { apiKey } from "./helpers/api/api-key";
import { capitalize } from "./helpers/functions/capitalize";
import { geoSearch, reverseGeoCode } from "./helpers/geocode/geo-search";
import convertTemp from "./helpers/temperature/temp";

import "./App.scss";

function Header() {
	return (
		<header className="weather-header">
			<img src={LittleEarth} alt="small earth" height="40px" />
			<h1 className="weather-header-title">Weather API</h1>
		</header>
	);
}

function WeatherInput() {
	const [searchBar, setSearchBar] = useState("");

	const unit = useSelector(myUnit);
	const location = useSelector(myLocation);
	const dispatch = useDispatch();

	return (
		<div className="weather-input-container">
			<input
				className="weather-input"
				name="search"
				placeholder="Enter a location, or enter lattitude and longitude seperated by a comma"
				value={searchBar}
				onChange={(e) => setSearchBar(e.target.value)}
				onKeyUp={async (e) => {
					if (e.key === "Enter") {
						if (!searchBar) return;

						const searchData = await geoSearch(searchBar);

						if (searchData[0]) {
							dispatch(setLocation({ latitude: searchData[0].lat, longitude: searchData[0].lon }));
						} else {
							dispatch(setLocation({ latitude: searchData.lat, longitude: searchData.lon }));
						}

						if (!location) return;

						const realAddress = await reverseGeoCode(location);
						dispatch(
							setGeocode({
								city: realAddress.address.city,
								state: realAddress.address.state,
								country: realAddress.address.country,
							})
						);

						e.target.blur();
					}
				}}
			/>
			<div className="weather-input-unit">
				<div>
					<label className="weather-input-unit-metric">
						<input
							type="radio"
							name="metric"
							value="metric"
							checked={unit === "metric" ? true : false}
							onChange={(e) => {
								dispatch(setUnit(e.target.value));
							}}
						/>
						Metric
					</label>
					<label className="weather-input-unit-imperial">
						<input
							type="radio"
							name="imperial"
							value="imperial"
							checked={unit === "imperial" ? true : false}
							onChange={(e) => {
								dispatch(setUnit(e.target.value));
							}}
						/>
						Imperial
					</label>
				</div>
			</div>
		</div>
	);
}

function WeatherInfo() {
	const location = useSelector(myLocation);
	const dispatch = useDispatch();

	useEffect(() => {
		dayjs.locale("en");

		const haveLocation = navigator.geolocation;

		if (haveLocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;

				dispatch(setLocation({ latitude, longitude }));
			});
		}
	}, [dispatch]);

	return (
		<div className="weather-info">
			<div className="weather-info-temp">{location ? <Info /> : null}</div>
		</div>
	);
}

function Info(props) {
	const address = useSelector(myAddress);
	const location = useSelector(myLocation);
	const weatherUnit = useSelector(myUnit);
	const dispatch = useDispatch();

	const { data } = useOpenWeather({
		key: apiKey,
		lat: location.latitude,
		lon: location.longitude,
		lang: "en",
		unit: "metric",
	});

	useEffect(() => {
		async function fetchAddress() {
			let realAddress;

			if (location) {
				realAddress = await reverseGeoCode(location);
			}

			if (realAddress.address) {
				dispatch(
					setGeocode({
						city: realAddress.address.city,
						state: realAddress.address.state,
						country: realAddress.address.country,
					})
				);
			}
		}

		fetchAddress();
	}, [dispatch, location]);

	return (
		<div>
			{data ? (
				<div>
					<div>
						<div>
							{address ? (
								<p className="weather-info-address-title bold">
									{address.city}, {address.state}, {address.country}
								</p>
							) : null}
						</div>
						<div className="weather-info-temp-container">
							<div className="weather-info-temp-today">
								<p className="weather-info-temp-title">Today:</p>
								<p className="weather-info-temp-date">
									{data.forecast[0].date.replaceAll(" ", ", ")}
								</p>
								<p className="bold">
									{weatherUnit === "imperial"
										? convertTemp(data.current.temperature.current)
										: data.current.temperature.current}
									&deg;
									{weatherUnit === "metric" ? "C" : "F"}, {capitalize(data.forecast[0].description)}
								</p>
								<p className="italic">
									Low:&nbsp;
									<span className="bold normal">
										{weatherUnit === "imperial"
											? convertTemp(data.forecast[0].temperature.min)
											: data.forecast[0].temperature.min}
										&deg;
										{weatherUnit === "metric" ? "C" : "F"}
									</span>
								</p>
								<p className="italic">
									High:&nbsp;
									<span className="bold normal">
										{weatherUnit === "imperial"
											? convertTemp(data.forecast[0].temperature.max)
											: data.forecast[0].temperature.max}
										&deg;
										{weatherUnit === "metric" ? "C" : "F"}
									</span>
								</p>
							</div>
							<div className="weather-info-temp-tomorrow">
								<p className="weather-info-temp-title">Tomorrow:</p>
								<p className="weather-info-temp-date">
									{data.forecast[1].date.replaceAll(" ", ", ")}
								</p>
								<p className="bold">{capitalize(data.forecast[1].description)}</p>
								<p className="italic">
									Low:&nbsp;
									<span className="bold normal">
										{weatherUnit === "imperial"
											? convertTemp(data.forecast[1].temperature.min)
											: data.forecast[1].temperature.min}
										&deg;
										{weatherUnit === "metric" ? "C" : "F"}
									</span>
								</p>
								<p className="italic">
									High:&nbsp;
									<span className="bold normal">
										{weatherUnit === "imperial"
											? convertTemp(data.forecast[1].temperature.max)
											: data.forecast[1].temperature.max}
										&deg;
										{weatherUnit === "metric" ? "C" : "F"}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

function Footer() {
	return (
		<footer className="weather-footer">
			<div className="weather-footer-left">
				<p>
					&copy; 2022 <a href="https://www.travisbriscoe.ca">Travis Briscoe</a>
				</p>
			</div>
			<div className="weather-footer-right">
				<a href="https://github.com/TravisBriscoe/ReactProjects/tree/main/ReactJs/weather-app">
					github
				</a>
			</div>
		</footer>
	);
}

function App() {
	return (
		<div className="App">
			<Header />
			<WeatherInput />
			<WeatherInfo />
			<Footer />
		</div>
	);
}

export default App;

