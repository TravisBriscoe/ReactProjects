import React from "react";
import { useOpenWeather } from "react-open-weather";

import "dayjs/locale/en";
import dayjs from "dayjs";

import LittleEarth from "./assets/little-earth.png";
import Lightning from "./assets/lightning.png";

import { apiKey } from "./helpers/api/api-key";
import { capitalize } from "./helpers/functions/capitalize";

import "./App.scss";

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
			<input className="weather-input" placeholder="Enter a city" value={props.searchBar} />
			<div className="weather-input-unit">
				<label>
					<input
						type="radio"
						name="metric"
						value="metic"
						checked={props.weatherUnit === "metric" ? true : false}
					/>
					Metric
				</label>
				<label>
					<input
						type="radio"
						name="imperial"
						value="metic"
						checked={props.weatherUnit === "metric" ? false : true}
					/>
					Imperial
				</label>
			</div>
		</div>
	);
}

class WeatherInfo extends React.Component {
	constructor() {
		super();

		// this.render = this.render.bind(this);

		this.state = {
			location: null,
		};
	}

	componentDidMount() {
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

	render() {
		return (
			<div className="weather-info">
				<div className="weather-info-temp">
					{this.state.location ? (
						<Info location={this.state.location} weatherUnit={this.props.weatherUnit} />
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

	if (data) {
		const totalWords = data.forecast[1].description.split(" ");
		let newWords = [];
		let newWord = "";

		for (let i = 0; i < totalWords.length; i++) {
			newWords.push(totalWords[i].replace(totalWords[i][0], totalWords[i][0].toUpperCase()));
		}

		newWord = newWords.join(" ");

		console.log(newWord);
	}

	return (
		// <ReactWeather
		// 	className="react-weather"
		// 	data={data}
		// 	isLoading={isLoading}
		// 	errorMessage={errorMessage}
		// />
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

		this.state = {
			searchBar: "",
			weatherUnit: "metric",
		};
	}

	componentDidMount() {
		dayjs.locale("en");
	}

	render() {
		return (
			<div className="App">
				<Header />
				<div className="weather-main">
					<WeatherInput searchBar={this.state.searchBar} weatherUnit={this.state.weatherUnit} />
					<WeatherInfo weatherUnit={this.state.weatherUnit} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;

