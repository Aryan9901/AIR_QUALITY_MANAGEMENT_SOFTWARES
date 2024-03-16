/* eslint-disable no-undef */
import axios from "axios";

export const getCountryNames = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_COUNTRY_NAMES_REQUEST",
		});
		const { data } = await axios.get(`http://api.airvisual.com/v2/countries?key=a049b2ed-ca11-4e3c-b28e-daddd0280c18`);
		dispatch({
			type: "GET_COUNTRY_NAMES_SUCCESS",
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: "GET_COUNTRY_NAMES_FAILURE",
			payload: error.response.data.message,
		});
	}
};

// ?? get city aqi data
export const getAqiByLatLong = (lat, long) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_AQI_DATA_REQUEST",
		});
		const { data } = await axios.get(
			`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=9c4a22c9216a8211f581788962507af5`
		);
		dispatch({
			type: "GET_AQI_DATA_SUCCESS",
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: "GET_AQI_DATA_FAILURE",
			payload: error.response.data.message,
		});
	}
};

// 9c4a22c9216a8211f581788962507af5
// http://api.openweathermap.org/data/2.5/air_pollution?lat=19.0760&lon=72.8777&appid=9c4a22c9216a8211f581788962507af5
