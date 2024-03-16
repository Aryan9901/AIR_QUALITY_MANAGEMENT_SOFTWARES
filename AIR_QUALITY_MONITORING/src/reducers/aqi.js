import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	loading: true,
};

export const aqiReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("GET_COUNTRY_NAMES_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_COUNTRY_NAMES_SUCCESS", (state, action) => {
			state.loading = false;
			state.countries = action.payload;
		})
		.addCase("GET_COUNTRY_NAMES_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("GET_NEAREST_CITY_DATA_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_NEAREST_CITY_DATA_SUCCESS", (state, action) => {
			state.loading = false;
			state.citydata = action.payload;
		})
		.addCase("GET_NEAREST_CITY_DATA_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("GET_AQI_DATA_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_AQI_DATA_SUCCESS", (state, action) => {
			state.loading = false;
			state.aqidata = action.payload;
		})
		.addCase("GET_AQI_DATA_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.messages = null;
		});
});
