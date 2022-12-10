import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./reducers/location";
import geocodeReducer from "./reducers/geocode";
import unitReducer from "./reducers/unit";

// import rootReducer from "./rootReducer";

// const initialState = {
// 	searchBar: "",
// 	weatherUnit: "metric",
// 	location: null,
// 	address: null,
// 	focusUnit: false,
// };

const store = configureStore(
	{
		reducer: { location: locationReducer, geocode: geocodeReducer, unit: unitReducer },
	},

	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
