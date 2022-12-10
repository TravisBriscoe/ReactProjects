export const initialState = {
	location: null,
	address: null,
	unit: "metric",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_LOCATION":
			return {
				...state,
				location: {
					latitude: action.location.latitude,
					longitude: action.location.longitude,
				},
			};
		case "SET_ADDRESS":
			return {
				...state,
				address: {
					street: action.address.street,
					city: action.address.city,
					state: action.address.state,
					country: action.address.country,
				},
			};
		case "SET_UNIT":
			return {
				...state,
				unit: action.unit,
			};

		default:
			return state;
	}
};

export default reducer;
