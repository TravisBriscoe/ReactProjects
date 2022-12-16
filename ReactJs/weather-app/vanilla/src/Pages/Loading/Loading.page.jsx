import React from "react";

import Spinner from "../../components/Spinner/Spinner.component";
import Info from "../../components/Info/Info.component";
import Error from "../../components/Error/Error.component";

function Loading(props) {
	const { location, address, unit, isError } = props;

	return (
		<Error isError={isError}>
			{location ? <Info location={location} address={address} unit={unit} /> : null}
		</Error>
	);
}

export default Spinner(Loading);
