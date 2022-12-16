import React from "react";

import LittleEarth from "../../assets/little-earth.png";

import "./Header.scss";

function Header() {
	return (
		<header className="weather-header">
			<img src={LittleEarth} alt="small earth" height="40px" />
			<h1 className="weather-header-title">Weather API</h1>
		</header>
	);
}

export default Header;
