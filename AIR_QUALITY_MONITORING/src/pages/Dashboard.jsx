/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import AdminSidebar from "../components/AdminSidebar";
// import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { IoIosPartlySunny } from "react-icons/io";
import Bar from "../components/Bar";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdWaterDrop } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useGeolocated } from "react-geolocated";
import { LineChart, PieChart } from "../components/chart";

// getCountryNames
const Dashboard = () => {
	const [aqi, setAqi] = useState();
	const [pollutants, setPollutants] = useState({});
	const [query, setQuery] = useState("");
	const [searchedLat, setSearchedLat] = useState("");
	const [searchedLong, setSearchedLong] = useState("");
	const [currCity, setCurrCity] = useState("");
	const [weather, setWeather] = useState({
		temp: "",
		humidity: "",
	});
	const [cityaqi, setCityaqi] = useState();
	const [cityPollutant, setCityPollutant] = useState();

	const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
		positionOptions: {
			enableHighAccuracy: false,
		},
		userDecisionTimeout: 5000,
	});

	useEffect(() => {
		if (!isGeolocationAvailable && !isGeolocationEnabled) {
			alert("Geolocation is unavailable");
		}
		const fetchAqiData = async () => {
			const { data } = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.latitude}&lon=${coords.longitude}&appid=9c4a22c9216a8211f581788962507af5`
			);

			setPollutants(data.list[0].components);
			setAqi(data.list[0].main.aqi);
		};

		setQuery("india");

		if (coords) {
			fetchAqiData();
		}
	}, [coords]);

	useEffect(() => {
		const fetchWeatherData = async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=9c4a22c9216a8211f581788962507af5&units=metric`
			);
			setWeather({
				temp: data.main.temp,
				humidity: data.main.humidity,
			});
			setSearchedLat(data.coord.lat);
			setSearchedLong(data.coord.lon);
		};

		if (query) {
			fetchWeatherData();
		}

		const fetchCity = async () => {
			const { data } = await axios.get("https://ipinfo.io/?token=");
			setCurrCity(data.city);
		};
		fetchCity();
	}, [query]);

	useEffect(() => {
		const fetchAqiByCity = async () => {
			const { data } = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${searchedLat}&lon=${searchedLong}&appid=9c4a22c9216a8211f581788962507af5`
			);
			setCityaqi(data.list[0].main.aqi);
			setCityPollutant(data.list[0].components);
		};
		if (searchedLat && searchedLong && query) {
			fetchAqiByCity();
		}
	}, [searchedLat, searchedLong]);

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard">
				<Bar query={query} setQuery={setQuery} />
				<div className="aqicnt">
					<section className="widget-container">
						<WidgetItem
							data={[
								cityPollutant?.pm2_5,
								cityPollutant?.co,
								cityPollutant?.no2,
								cityPollutant?.so2,
								cityPollutant?.nh3,
								cityPollutant?.pm10,
							]}
							heading={query}
						/>
						<WidgetItem heading={currCity || ""} color="rgba(0,198,202)" data={[38, 306, 10, 6, pollutants?.nh3, pollutants?.pm10]} />
						{/* <WidgetItem percent={4} value={23000} heading="Invoices"  /> */}
					</section>
					<section className="mapContainer">
						<div className="HomeCard">
							<div className="header">
								<h3>
									<FaLocationArrow />
									{query}
								</h3>
								<button className={cityaqi > 10 ? "redbg" : aqi >= 5 ? "purplebg" : "greenbg"}>
									{aqi > 10 ? "Severe" : aqi >= 5 ? "Moderate" : "Mild"}
								</button>
							</div>
							<div className="maindata">
								<div className="graph">
									<CircularProgressbar value={cityaqi} text={`${cityaqi}`} />

									<div className="g1">
										<IoIosPartlySunny /> {weather.temp}C
									</div>
									<div className="g2">
										<MdWaterDrop /> {weather.humidity}
									</div>
								</div>
								<div className="data">
									{cityPollutant && (
										<>
											<AqiLevel value={cityPollutant.pm2_5} unit="ug/m^2" parameter="PM 2.5" color={"yellow"} />
											<AqiLevel value={cityPollutant.co} unit="ug/m^2" parameter="CO" color={"red"} />
											<AqiLevel value={cityPollutant.no2} unit="ug/m^2" parameter="NO2" color={"green"} />
											<AqiLevel value={cityPollutant.pm10} unit="ug/m^2" parameter="PM10" color={"salmon"} />
											<AqiLevel value={cityPollutant.so2} unit="ug/m^2" parameter="SO2" color={"cyan"} />
											<AqiLevel value={cityPollutant.nh3} unit="ug/m^2" parameter="NH3" color={"cyan"} />
										</>
									)}
								</div>
							</div>
							<div className="linegraphdata">
								<LineChart
									data={[cityPollutant?.pm2_5, cityPollutant?.no2, cityPollutant?.pm10, cityPollutant?.so2, cityPollutant?.nh3]}
									legend="true"
									labels={["PM 2.5", "NO2", "PM10", "SO2", "NH3"]}
									backgroundColor={"#f8000087"}
									borderColor={"blue"}
									label={"Pollutants Level"}
								/>
							</div>
							<div className="piechartdata">
								<PieChart
									data={[cityPollutant?.pm2_5, cityPollutant?.no2, cityPollutant?.pm10, cityPollutant?.so2, cityPollutant?.nh3]}
									labels={["PM 2.5", "NO2", "PM10", "SO2", "NH3"]}
									backgroundColor={["yellow", "#f8000087", "green", "blue", "#ffc44c", "purple"]}
									borderColor={"blue"}
								/>
							</div>
						</div>
						<section className="cityCard">
							<div className="header">
								<h3>
									<FaLocationArrow />
									Home
								</h3>
								<button className={cityaqi > 10 ? "redbg" : aqi >= 5 ? "purplebg" : "greenbg"}>
									{aqi > 10 ? "Severe" : aqi >= 5 ? "Moderate" : "Mild"}
								</button>
							</div>
							<p>AQI trend in last 24 hrs</p>
							<div className="maindata" style={{ marginBottom: "2rem" }}>
								<div className="graph">
									<CircularProgressbar value={aqi} text={`${aqi}`} />
								</div>
								<div className="data">
									<AqiLevel value={pollutants.pm2_5} unit="ug/m^2" parameter="PM 2.5" color={"yellow"} />
									<AqiLevel value={pollutants.co} unit="ug/m^2" parameter="CO" color={"red"} />
									<AqiLevel value={pollutants.no2} unit="ug/m^2" parameter="NO2" color={"green"} />
									<AqiLevel value={pollutants.pm10} unit="ug/m^2" parameter="PM10" color={"salmon"} />
									<AqiLevel value={pollutants.so2} unit="ug/m^2" parameter="SO2" color={"cyan"} />
									<AqiLevel value={pollutants.nh3} unit="ug/m^2" parameter="NH3" color={"cyan"} />
								</div>
							</div>
							<PieChart
								data={[pollutants?.pm2_5, pollutants?.no2, pollutants?.pm10, pollutants?.so2, pollutants?.nh3]}
								labels={["PM 2.5", "NO2", "PM10", "SO2", "NH3"]}
								backgroundColor={["yellow", "#f8000087", "green", "blue", "#ffc44c", "purple"]}
								borderColor={"blue"}
							/>
						</section>
					</section>
				</div>
			</main>
		</div>
	);
};

export const AqiLevel = ({ value, unit, parameter, color, max = 100 }) => {
	return (
		<div className="aqiLevel">
			<ProgressBar bgColor={color} completed={value} className="wrapper" maxCompleted={max} customLabel=" " />
			<h3>
				{value} {unit}
			</h3>
			<p>{parameter}</p>
		</div>
	);
};

// const calculateAqi = (data) => {
// 	// Define national standards for each pollutant
// 	const nationalStandards = {
// 		pm25: 25,
// 		co: 10,
// 		no2: 40,
// 		so2: 20,
// 		nh3: 25,
// 		pm10: 50,
// 	};

// 	// Calculate AQI for each pollutant
// 	const calculatePollutantAqi = (pollutant, value) => {
// 		const standard = nationalStandards[pollutant];
// 		return Math.round((value / standard) * 100);
// 	};

// 	// Calculate AQI for each pollutant in the data array
// 	const aqiValues = data.map((value, index) => {
// 		const pollutant = ["pm25", "co", "no2", "so2", "nh3", "pm10"][index];
// 		return calculatePollutantAqi(pollutant, parseFloat(value));
// 	});

// 	// Return the maximum AQI value
// 	return Math.max(...aqiValues);
// };

const calculateAqi = (data) => {
	// Define AQI breakpoints and corresponding ranges for each pollutant
	const aqiBreakpoints = {
		pm25: [0, 12, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4],
		pm10: [0, 55, 155, 255, 355, 425, 505, 605],
		co: [0, 4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4],
		no2: [0, 53, 100, 360, 649, 1249, 1649, 2049],
		so2: [0, 35, 75, 185, 304, 604, 804, 1004],
		nh3: [0, 53, 100, 360, 649, 1249, 1649, 2049],
	};

	// Calculate AQI for each pollutant
	const calculatePollutantAqi = (pollutant, value) => {
		const breakpoints = aqiBreakpoints[pollutant];
		let aqi = 0;

		for (let i = 0; i < breakpoints.length - 1; i++) {
			if (value >= breakpoints[i] && value <= breakpoints[i + 1]) {
				aqi = Math.round(((breakpoints[i + 1] - breakpoints[i]) / (breakpoints[i + 1] - breakpoints[i])) * (i + 1));
				break;
			}
		}
		return aqi;
	};

	// Calculate AQI for each pollutant in the data array
	const aqiValues = data.map((value, index) => {
		const pollutant = ["pm25", "pm10", "co", "no2", "so2", "nh3"][index];
		return calculatePollutantAqi(pollutant, parseFloat(value));
	});

	// Return the maximum AQI value
	return Math.max(...aqiValues);
};

// Test the function
const data = [23, 35, 2.5, 89, 20, 49]; // Example data, replace with your actual data
const aqi = calculateAqi(data);
console.log("AQI:", aqi);

export const WidgetItem = ({ heading, aqivalue, data }) => {
	return (
		<article className="widget">
			<div>
				<h4>{heading}</h4>
				{/* <p>
					<select value={selectedOption} onChange={handleOptionChange}>
						<option value="Today">Today</option>
						<option value="LastWeek">Last Week</option>
						<option value="LastMonth">Last Month</option>
						<option value="LastYear">Last Year</option>
						<option value="All">All</option>
					</select>
				</p> */}
			</div>
			<h2>{Math.abs(calculateAqi(data))}</h2>
			<h3>{calculateAqi(data)}</h3>
		</article>
	);
};

export default Dashboard;

// http://api.airvisual.com/v2/countries?key={{YOUR_API_KEY}}
