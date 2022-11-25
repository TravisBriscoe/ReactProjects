import React from "react";

import "./button.css";

// Custom button component, makes it easier for styling

function Button(props) {
	return (
		<button onClick={props.onClick} {...props}>
			{props.children}
		</button>
	);
}

export default Button;
