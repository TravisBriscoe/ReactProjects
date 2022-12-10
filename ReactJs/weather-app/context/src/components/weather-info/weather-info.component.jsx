import React from "react";

import Info from "../info/info.component";

import { useStateValue } from "../../helpers/context/stateprovider";

function WeatherInfo() {
	const [{ location }] = useStateValue();

	return (
		<div className="weather-info">
			<div className="weather-info-temp">{location ? <Info /> : null}</div>
		</div>
	);
}

export default WeatherInfo;
