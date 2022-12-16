import React, { useState } from "react";

import "./WeatherInput.scss";

function WeatherInput({
	unit,
	onHandleSearchChange,
	onHandleUnitChange,
	changeIsLoading,
	clearIsError,
}) {
	const [searchBar, setSearchBar] = useState("");

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

						changeIsLoading();
						clearIsError();

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

export default WeatherInput;
