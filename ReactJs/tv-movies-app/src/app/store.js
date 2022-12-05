import { configureStore } from "@reduxjs/toolkit";

import mediaReducer from "../redux/slices/media";

export const store = configureStore(
	{
		reducer: { media: mediaReducer },
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

