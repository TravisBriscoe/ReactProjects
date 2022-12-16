import React from "react";

import "./Spinner.scss";

function Spinner(Component) {
	return function WithSpinner({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<div className="spin-container">
				<div className="spin"></div>
			</div>
		);
	};
}

export default Spinner;
