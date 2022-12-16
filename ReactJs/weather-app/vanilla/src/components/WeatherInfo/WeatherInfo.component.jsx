import React from "react";

import Loading from "../../Pages/Loading/Loading.page";

function WeatherInfo(props) {
	return (
		<div className="weather-info">
			<div className="weather-info-temp">
				<Loading {...props} />
			</div>
		</div>
	);
}

export default WeatherInfo;
