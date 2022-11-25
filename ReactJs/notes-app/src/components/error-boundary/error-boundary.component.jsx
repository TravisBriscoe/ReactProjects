import React from "react";

import "./error-boundary.css";

// Error boundary for any errors that user might see.

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			errorInfo: null,
		};
	}

	componentDidCatch(error, errorInfo) {
		this.props.closeModal();
		this.setState({ error: error, errorInfo: errorInfo });
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<div className="error">
					<h1>Something went wrong.</h1>
					<h1>Please try again.</h1>
					<h3>If the error persists, please contact an administrator</h3>
					<details>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
