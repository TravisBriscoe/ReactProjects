import { createSlice } from "@reduxjs/toolkit";

export const unitSlice = createSlice({
	name: "unit",
	initialState: {
		unit: "metric",
	},
	reducers: {
		setUnit: (state, action) => {
			state.unit = action.payload;
		},
	},
});

export const myUnit = (state) => state.unit.unit;

export const { setUnit } = unitSlice.actions;

export default unitSlice.reducer;
