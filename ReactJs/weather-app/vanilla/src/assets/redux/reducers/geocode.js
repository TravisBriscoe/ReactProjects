import { createSlice } from "@reduxjs/toolkit";

export const geocodeSlice = createSlice({
	name: "geocode",
	initialState: {
		address: null,
	},
	reducers: {
		setGeocode: (state, action) => {
			state.address = { ...action.payload };
		},
	},
});

// export const geocodeApi = createApi({
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: "/",
// 	}),
// 	tagTypes: ["Post"],
// 	endpoints: (build) => ({}),
// });

export const myAddress = (state) => state.geocode.address;

export const { setGeocode } = geocodeSlice.actions;

export default geocodeSlice.reducer;
