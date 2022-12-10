import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
	name: "location",
	initialState: { location: null },
	reducers: {
		setLocation: (state, action) => {
			state.location = { ...action.payload };
		},
	},
});

export const myLocation = (state) => state.location.location;

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
