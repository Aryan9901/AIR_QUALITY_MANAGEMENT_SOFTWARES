import { configureStore } from "@reduxjs/toolkit";
import { aqiReducer } from "./reducers/aqi.js";

export const store = configureStore({
	reducer: { aqi: aqiReducer },
});
