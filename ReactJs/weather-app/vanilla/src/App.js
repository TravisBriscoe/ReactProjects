import React from "react";
import { useOpenWeather } from "react-open-weather";

import "dayjs/locale/en";
import dayjs from "dayjs";

import LittleEarth from "./assets/little-earth.png";

import { apiKey } from "./helpers/api/api-key";
import capitalize from "./helpers/functions/capitalize";
import convertTemp from "./helpers/temperature/temp";
import { geoSearch, reverseGeoCode } from "./helpers/geocode/geo-search";

import "./App.scss";

function Header() {
	return (
		<header className="weather-header">
			<img src={LittleEarth} alt="small earth" height="40px" />
			<h1 className="weather-header-title">Weather API</h1>
		</header>
	);
}

function WeatherInput({ unit, onHandleSearchChange, onHandleUnitChange }) {
	const [searchBar, setSearchBar] = React.useState("");

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

						onHandleSearchChange(e);

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
							checked={unit === "metric"}
							onChange={(e) => {
								onHandleUnitChange(e);
							}}
						/>
						Metric
					</label>
					<label className="weather-input-unit-imperial">
						<input
							type="radio"
							name="imperial"
							value="imperial"
							checked={unit === "imperial"}
							onChange={(e) => {
								onHandleUnitChange(e);
							}}
						/>
						Imperial
					</label>
				</div>
			</div>
		</div>
	);
}

function WeatherInfo({ location, address, unit }) {
	return (
		<div className="weather-info">
			<div className="weather-info-temp">
				{location ? <Info location={location} address={address} weatherUnit={unit} /> : null}
			</div>
		</div>
	);
}

function Info({ location, address, weatherUnit }) {
	const { data } = useOpenWeather({
		key: apiKey,
		lat: location.latitude,
		lon: location.longitude,
		lang: "en",
		unit: "metric",
	});

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
								<p className="bold weather-info-temp-current">
									{weatherUnit === "imperial"
										? convertTemp(data.current.temperature.current)
										: data.current.temperature.current}
									&deg;
									{weatherUnit === "metric" ? "C" : "F"}, {capitalize(data.forecast[0].description)}
									<svg
										viewBox="0 0 30 30"
										height="30"
										width="50"
										xmlns="http://www.w3.org/2000/svg/"
										className="weather-info-temp-icon"
									>
										<path d={data.forecast[0].icon} />
									</svg>
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
								<p className="bold weather-info-temp-current">
									{capitalize(data.forecast[1].description)}{" "}
									<svg
										viewBox="0 0 30 30"
										height="30"
										width="50"
										xmlns="http://www.w3.org/2000/svg/"
										className="weather-info-temp-icon"
									>
										<path d={data.forecast[1].icon} />
									</svg>
								</p>
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

class App extends React.Component {
	constructor() {
		super();

		this.onHandleSearchChange = this.onHandleSearchChange.bind(this);
		this.onHandleUnitChange = this.onHandleUnitChange.bind(this);
		this.onReverseGeocode = this.onReverseGeocode.bind(this);

		this.state = {
			unit: "metric",
			location: null,
			address: null,
		};
	}

	componentDidMount() {
		dayjs.locale("en");

		const haveLocation = navigator.geolocation;

		if (haveLocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;

				this.setState({ location: { latitude, longitude } }, () => {
					this.onReverseGeocode();
				});
			});
		}
	}

	async onReverseGeocode() {
		const data = await reverseGeoCode(this.state.location);

		this.setState({
			address: {
				street: data.address.street,
				city: data.address.city,
				state: data.address.state,
				country: data.address.country,
			},
		});
	}

	onHandleUnitChange(e) {
		this.setState({ unit: e.target.value });
	}

	async onHandleSearchChange(e) {
		const searchData = await geoSearch(e.target.value);
		if (searchData[0]) {
			this.setState(
				{
					location: { latitude: searchData[0].lat, longitude: searchData[0].lon },
				},
				() => this.onReverseGeocode()
			);
		} else {
			this.setState({ location: { latitude: searchData.lat, longitude: searchData.lon } }, () =>
				this.onReverseGeocode()
			);
		}
	}

	render() {
		return (
			<div className="App">
				<Header />
				<WeatherInput
					onHandleSearchChange={this.onHandleSearchChange}
					onHandleUnitChange={this.onHandleUnitChange}
					unit={this.state.unit}
				/>
				<WeatherInfo
					location={this.state.location}
					address={this.state.address}
					unit={this.state.unit}
				/>
				<Footer />
			</div>
		);
	}
}

export default App;

