import { createSlice } from "@reduxjs/toolkit";

export const mediaSlice = createSlice({
	name: "Media Data",
	initialState: {
		movies: [
			{ title: "Movie1", img: null },
			{ title: "Movie2", img: null },
			{ title: "Movie3", img: null },
		],
		tvshows: [
			{ title: "TvShow1", img: null },
			{ title: "TvShow2", img: null },
			{ title: "TvShow3", img: null },
		],
	},
	reducers: {
		addMovies: (state, action) => {
			state.movies = action.payload;
		},
		addTvShows: (state, action) => {
			state.tvshows = action.payload;
		},
	},
});

export const myMedia = (state) => state;

export const { addMovies, addTvShows } = mediaSlice.actions;

export default mediaSlice.reducer;
