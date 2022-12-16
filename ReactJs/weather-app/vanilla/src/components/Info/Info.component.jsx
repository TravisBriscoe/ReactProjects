import React from "react";

import { useOpenWeather } from "react-open-weather";

import { apiKey } from "../../helpers/api/api-key";
import capitalize from "../../helpers/functions/capitalize";
import { convertTemp, removeNegative } from "../../helpers/temperature/temp";

import "./Info.scss";

function Info({ location, address, unit }) {
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
									{unit === "imperial"
										? convertTemp(removeNegative(data.current.temperature.current))
										: removeNegative(data.current.temperature.current)}
									&deg;
									{unit === "metric" ? "C" : "F"}, {capitalize(data.forecast[0].description)}
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
										{unit === "imperial"
											? convertTemp(removeNegative(data.forecast[0].temperature.min))
											: removeNegative(data.forecast[0].temperature.min)}
										&deg;
										{unit === "metric" ? "C" : "F"}
									</span>
								</p>
								<p className="italic">
									High:&nbsp;
									<span className="bold normal">
										{unit === "imperial"
											? convertTemp(removeNegative(data.forecast[0].temperature.max))
											: removeNegative(data.forecast[0].temperature.max)}
										&deg;
										{unit === "metric" ? "C" : "F"}
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
										{unit === "imperial"
											? convertTemp(removeNegative(data.forecast[1].temperature.min))
											: removeNegative(data.forecast[1].temperature.min)}
										&deg;
										{unit === "metric" ? "C" : "F"}
									</span>
								</p>
								<p className="italic">
									High:&nbsp;
									<span className="bold normal">
										{unit === "imperial"
											? convertTemp(removeNegative(data.forecast[1].temperature.max))
											: removeNegative(data.forecast[1].temperature.max)}
										&deg;
										{unit === "metric" ? "C" : "F"}
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

export default Info;
