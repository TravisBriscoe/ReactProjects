import React from "react";

class Error extends React.Component {
	render() {
		const { isError, children } = this.props;

		if (isError.error) {
			return (
				<div
					className="weather-error"
					style={{
						height: "100%",
						width: "100%",
						position: "relative",
					}}
				>
					<p
						style={{
							position: "absolute",
							// top: "50%",
							// left: "50%",
							// transform: "translate3d(-50%, -50%, 0)",
							fontSize: "54px",
							color: "red",
							textAlign: "center",
						}}
					>
						{isError.message}
					</p>
				</div>
			);
		} else return children;
	}
}

export default Error;
