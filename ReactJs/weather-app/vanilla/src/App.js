import React from "react";

import "dayjs/locale/en";
import dayjs from "dayjs";

import Header from "./components/Header/Header.component";
import WeatherInput from "./components/WeatherInput/WeatherInput.component";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo.component";
import Footer from "./components/Footer/Footer.component";

import { geoSearch, reverseGeoCode } from "./helpers/geocode/geo-search";

import "./App.scss";

class App extends React.Component {
	constructor() {
		super();

		this.onHandleSearchChange = this.onHandleSearchChange.bind(this);
		this.onHandleUnitChange = this.onHandleUnitChange.bind(this);
		this.onReverseGeocode = this.onReverseGeocode.bind(this);
		this.changeIsLoading = this.changeIsLoading.bind(this);
		this.clearIsError = this.clearIsError.bind(this);

		this.state = {
			unit: "metric",
			location: null,
			address: null,
			isLoading: false,
			isError: {
				error: false,
				message: null,
			},
		};
	}

	componentDidMount() {
		dayjs.locale("en");

		this.setState({ isLoading: true });

		const haveLocation = navigator.geolocation;

		if (haveLocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					if (position.coords) {
						const { latitude, longitude } = position.coords;

						this.setState({ location: { latitude, longitude } }, () => {
							this.onReverseGeocode();
						});
					}
				},
				() => {
					this.setState({
						isError: {
							error: true,
							message:
								"Cannot determine location. Please allow Location Services or use Searchbar.",
						},
						isLoading: false,
					});
				}
			);
		}
	}

	async onReverseGeocode() {
		this.setState({ isLoading: true });

		try {
			const data = await reverseGeoCode(this.state.location);

			if (data) {
				this.setState({
					address: {
						street: data.address.street,
						city: data.address.city,
						state: data.address.state,
						country: data.address.country,
					},
					isLoading: false,
				});
			}
		} catch (e) {
			this.setState({
				isLoading: false,
				isError: {
					error: true,
					message: "Invalid Location or Weather server is down. Please try again in a few minutes.",
				},
			});
		}
	}

	onHandleUnitChange(e) {
		this.setState({ unit: e.target.value });
	}

	async onHandleSearchChange(e) {
		const searchData = await geoSearch(e.target.value);

		try {
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
		} catch (e) {
			this.setState({
				isError: {
					error: true,
					message: "Invalid Location or Weather server is down. Please try again in a few minutes.",
				},
			});
		}
	}

	changeIsLoading() {
		this.setState({ isLoading: !this.state.isLoading });
	}

	clearIsError() {
		this.setState({ isError: { error: false, message: null } });
	}

	render() {
		return (
			<div className="App">
				<Header />
				<WeatherInput
					onHandleSearchChange={this.onHandleSearchChange}
					onHandleUnitChange={this.onHandleUnitChange}
					unit={this.state.unit}
					isLoading={this.state.isLoading}
					changeIsLoading={this.changeIsLoading}
					clearIsError={this.clearIsError}
				/>
				<WeatherInfo
					location={this.state.location}
					address={this.state.address}
					unit={this.state.unit}
					isLoading={this.state.isLoading}
					isError={this.state.isError}
					changeIsLoading={this.changeIsLoading}
				/>
				<Footer />
			</div>
		);
	}
}

export default App;

