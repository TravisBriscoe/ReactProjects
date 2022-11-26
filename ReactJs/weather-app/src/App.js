import React from "react";
import { useOpenWeather } from "react-open-weather";

import "dayjs/locale/en";
import dayjs from "dayjs";

import LittleEarth from "./assets/mini_little-earth.png";
import Lightning from "./assets/lightning.png";

import { apiKey } from "./helpers/api/api-key";
import { capitalize } from "./helpers/functions/capitalize";

import "./App.scss";
import geoSearch from "./helpers/geocode/geo-search";

function Header() {
	return (
		<header className="weather-header">
			<img src={LittleEarth} alt="small earth" height="40px" />
			<h1 className="weather-header-title">Weather API</h1>
			<img src={Lightning} alt="lighning bolt" height="35px" />
		</header>
	);
}

function WeatherInput(props) {
	return (
		<div className="weather-input-container">
			<input
				className="weather-input"
				name="search"
				placeholder="Enter a location, or enter lattitude and longitude seperated by a comma"
				value={props.searchBar}
				onChange={props.onChangeHandler}
			/>
			<button onClick={props.onSearchHandler}>Search</button>
			<div className="weather-input-unit">
				<label>
					<input
						type="radio"
						name="metric"
						value="metric"
						checked={props.weatherUnit === "metric" ? true : false}
						onChange={props.onChangeHandler}
					/>
					Metric
				</label>
				<label>
					<input
						type="radio"
						name="standard"
						value="standard"
						checked={props.weatherUnit === "standard" ? true : false}
						onChange={props.onChangeHandler}
					/>
					Standard
				</label>
				<label>
					<input
						type="radio"
						name="imperial"
						value="imperial"
						checked={props.weatherUnit === "imperial" ? true : false}
						onChange={props.onChangeHandler}
					/>
					Imperial
				</label>
			</div>
		</div>
	);
}

class WeatherInfo extends React.Component {
	render() {
		return (
			<div className="weather-info">
				<div className="weather-info-temp">
					{this.props.location ? (
						<Info location={this.props.location} weatherUnit={this.props.weatherUnit} />
					) : null}
				</div>
			</div>
		);
	}
}

function Info(props) {
	const { data } = useOpenWeather({
		key: apiKey,
		lat: props.location.latitude,
		lon: props.location.longitude,
		lang: "en",
		unit: props.weatherUnit,
	});

	return (
		<div>
			{data ? (
				<div>
					<div>
						<p>{data.forecast[0].date}</p>
						<p>
							Current:&nbsp;
							{data.current.temperature.current}
							&deg;
							{props.weatherUnit === "metric" ? "C" : "F"},{" "}
							{capitalize(data.forecast[0].description)}
						</p>
						<p>
							Low:&nbsp;
							{data.forecast[0].temperature.min}
							&deg;
							{props.weatherUnit === "metric" ? "C" : "F"}
						</p>
						<p>
							High:&nbsp;
							{data.forecast[0].temperature.max}
							&deg;
							{props.weatherUnit === "metric" ? "C" : "F"}
						</p>
					</div>
					<div>
						<p>Tomorrow {data.forecast[1].date}:</p>
						<p>{capitalize(data.forecast[1].description)}</p>
						<p>
							Low:&nbsp;
							{data.forecast[1].temperature.min}&nbsp;
							<span>
								&deg;
								{props.weatherUnit === "metric" ? "C" : "F"}
							</span>
						</p>
						<p>
							High:&nbsp;
							{data.forecast[1].temperature.max}&nbsp;
							<span>
								&deg;
								{props.weatherUnit === "metric" ? "C" : "F"}
							</span>
						</p>
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

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSearchHandler = this.onSearchHandler.bind(this);

		this.state = {
			searchBar: "",
			weatherUnit: "metric",
			location: null,
		};
	}

	componentDidMount() {
		dayjs.locale("en");

		const haveLocation = navigator.geolocation;

		if (haveLocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;

				this.setState({ location: { latitude, longitude } }, () =>
					console.log(this.state.location)
				);
			});
		}
	}

	async onSearchHandler() {
		const searchData = await geoSearch(this.state.searchBar);
		console.log(searchData[0]);
		console.log(searchData[0].lat);
		this.setState({ location: { latitude: searchData[0].lat, longitude: searchData[0].lon } });
	}

	onChangeHandler(event) {
		const { value, name } = event.target;

		if (name === "search") {
			this.setState({ searchBar: value });
		} else {
			this.setState({ weatherUnit: value });
		}
	}

	render() {
		return (
			<div className="App">
				<Header />
				<div className="weather-main">
					<WeatherInput
						searchBar={this.state.searchBar}
						weatherUnit={this.state.weatherUnit}
						onSearchHandler={this.onSearchHandler}
						onChangeHandler={this.onChangeHandler}
					/>
					<WeatherInfo weatherUnit={this.state.weatherUnit} location={this.state.location} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;

