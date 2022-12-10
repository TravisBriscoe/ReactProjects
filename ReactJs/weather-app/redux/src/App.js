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

function Info() {
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

	console.log(data);

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

	const todayBackround = {
		backgroundImage: `url(
			"data:image/svg+xml,%3CsvgviewBox='0 0 35 35'xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20.328q0-2.484 1.547-4.414t3.969-2.477q0.641-2.938 2.969-4.805t5.359-1.867q2.953 0 5.273 1.82t3.008 4.664h0.453q2.938 0 5.016 2.070t2.078 5.008-2.078 5.023-5.016 2.086h-15.469q-1.438 0-2.758-0.563t-2.273-1.516-1.516-2.273-0.563-2.758zM2.422 20.328q0 1.906 1.375 3.273t3.313 1.367h15.469q1.938 0 3.313-1.367t1.375-3.273-1.375-3.266-3.313-1.359h-2.313q-0.25 0-0.25-0.25l-0.109-0.813q-0.25-2.359-1.977-3.914t-4.086-1.555-4.102 1.563-1.961 3.906l-0.109 0.703q0 0.25-0.266 0.25l-0.75 0.109q-1.797 0.156-3.016 1.484t-1.219 3.141zM17.172 5.797q-0.25 0.234 0.125 0.344 1.078 0.469 1.797 0.922 0.281 0.078 0.375-0.047 1.516-1.438 3.531-1.438t3.492 1.352 1.648 3.336l0.156 1.063h2.359q1.625 0 2.797 1.164t1.172 2.773q0 1.5-1.031 2.609t-2.547 1.281q-0.25 0-0.25 0.266v1.891q0 0.266 0.25 0.266 2.516-0.156 4.25-1.984t1.734-4.328q0-2.641-1.867-4.508t-4.508-1.867h-0.25q-0.656-2.5-2.742-4.117t-4.664-1.617q-3.531 0-5.828 2.641z' /%3E%3C/svg%3E"
		)`,
	};

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
								<div style={todayBackround} className="weather-info-temp-today-icon">
									{/* <svg
										viewBox="0 0 40 35"
										color="rgba(0,0,0,.5"
										xmlns="http://www.w3.org/2000/svg"
										className="weather-info-temp-today-icon"
									>
										<path d={data.forecast[0].icon} />
									</svg> */}
									<p className="weather-info-temp-title">Today:</p>
									<p className="weather-info-temp-date">
										{data.forecast[0].date.replaceAll(" ", ", ")}
									</p>
									<p className="bold">
										{weatherUnit === "imperial"
											? convertTemp(data.current.temperature.current)
											: data.current.temperature.current}
										&deg;
										{weatherUnit === "metric" ? "C" : "F"},{" "}
										{capitalize(data.forecast[0].description)}
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

