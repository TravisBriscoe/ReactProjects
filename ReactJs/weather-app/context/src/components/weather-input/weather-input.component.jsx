import React, { useState } from "react";

import { useStateValue } from "../../helpers/context/stateprovider";
import { geoSearch, reverseGeoSearch } from "../../helpers/geocode/geo-search";

import "./weather-input.scss";

function WeatherInput() {
	const [searchBar, setSearchBar] = useState("");
	const [{ unit }, dispatch] = useStateValue();

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

						const geoData = await geoSearch(searchBar);

						dispatch({
							type: "SET_LOCATION",
							location: { latitude: geoData[0].lat, longitude: geoData[0].lon },
						});

						const navData = await reverseGeoSearch({
							latitude: geoData[0].lat,
							longitude: geoData[0].lon,
						});

						dispatch({
							type: "SET_ADDRESS",
							address: {
								street: navData.address.road,
								city: navData.address.city,
								state: navData.address.state,
								country: navData.address.country,
							},
						});

						e.target.blur();
						setSearchBar("");
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
								dispatch({ type: "SET_UNIT", unit: "metric" });
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
								dispatch({ type: "SET_UNIT", unit: "imperial" });
							}}
						/>
						Imperial
					</label>
				</div>
			</div>
		</div>
	);
}

export default WeatherInput;
