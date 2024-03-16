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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useGeolocated } from "react-geolocated";
import { LineChart, PieChart } from "../components/chart";

// const aqiComparision = () => {};

// getCountryNames
const Dashboard = () => {
	const [aqi, setAqi] = useState();
	const [pollutants, setPollutants] = useState({});
	const [query, setQuery] = useState("");
	const [searchedLat, setSearchedLat] = useState("");
	const [searchedLong, setSearchedLong] = useState("");
	const [currCity, setCurrCity] = useState("");
	const [cityAqi, setCityAqi] = useState("");
	const [searchedcity, setSearchedcity] = useState("");
	const [currAqi, setCurrAqi] = useState("");
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
		const fetchCity = async () => {
			const { data } = await axios.get("https://ipinfo.io/?token=");
			const loc = data.loc.split(",");
			const response = await axios.get(`https://api.waqi.info/feed/geo:${loc[0]};${loc[1]}/?token=5eadc71e11cfc7bef95ecb69790a6f6a10254a34`);
			setCurrCity(response.data.data.city.name);
			setCurrAqi(response.data.data.aqi);
		};
		fetchCity();
		setQuery("bhopal");
	}, []);

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
		`	`;

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
	}, [query]);

	useEffect(() => {
		const fetchAqiByCity = async () => {
			const { data } = await axios.get(
				`http://api.openweathermap.org/data/2.5/air_pollution?lat=${searchedLat}&lon=${searchedLong}&appid=9c4a22c9216a8211f581788962507af5`
			);
			setCityaqi(data.list[0].main.aqi);
			setCityPollutant(data.list[0].components);
		};

		const fetchCityAqi = async () => {
			const { data } = await axios.get(
				`https://api.waqi.info/feed/geo:${searchedLat};${searchedLong}/?token=5eadc71e11cfc7bef95ecb69790a6f6a10254a34`
			);
			console.log(data);
			setCityAqi(data.data.aqi);
			setSearchedcity(data.data.city.name);
		};

		if (searchedLat && searchedLong && query) {
			fetchAqiByCity();
			fetchCityAqi();
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
							heading={searchedcity}
							aqi={cityAqi}
						/>
						<WidgetItem
							heading={currCity || ""}
							color="rgba(0,198,202)"
							data={[38, 306, 10, 6, pollutants?.nh3, pollutants?.pm10]}
							aqi={currAqi}
						/>
						{/* <WidgetItem percent={4} value={23000} heading="Invoices"  /> */}
					</section>
					<section className="mapContainer">
						<div className="HomeCard">
							<div className="header">
								<h3>
									<FaLocationArrow />
									{searchedcity}
								</h3>
								<button className={cityaqi > 10 ? "redbg" : aqi >= 5 ? "purplebg" : "greenbg"}>
									{aqi > 10 ? "Severe" : aqi >= 5 ? "Moderate" : "Mild"}
								</button>
							</div>
							<div className="maindata">
								<div className="graph">
									<CircularProgressbar value={cityAqi} text={`${cityAqi}`} />

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
								<h3>{currCity}</h3>
								<button className={cityaqi > 10 ? "redbg" : aqi >= 5 ? "purplebg" : "greenbg"}>
									{aqi > 10 ? "Severe" : aqi >= 5 ? "Moderate" : "Mild"}
								</button>
							</div>
							<div className="maindata" style={{ marginBottom: "2rem" }}>
								<div className="graph">
									<CircularProgressbar value={currAqi} text={`${currAqi}`} maxValue={500} />
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

export const WidgetItem = ({ heading, aqi }) => {
	let pathColor = "";
	let aqiLevel = "";

	if (aqi >= 401 && aqi <= 500) {
		pathColor = "#bf2133";
		aqiLevel = "Hazardous";
	} else if (aqi >= 301 && aqi <= 400) {
		pathColor = "#975aa0";
		aqiLevel = "Severe";
	} else if (aqi >= 201 && aqi <= 300) {
		pathColor = "pink";
		aqiLevel = "Unhealthy";
	} else if (aqi >= 101 && aqi <= 200) {
		pathColor = "#e75834";
		aqiLevel = "Poor";
	} else if (aqi >= 51 && aqi <= 100) {
		pathColor = "#D4CA2F";
		aqiLevel = "Moderate";
	} else {
		pathColor = "#39a033";
		aqiLevel = "Good";
	}

	let emoji = "";
	if (aqiLevel === "Hazardous" || aqiLevel === "Severe") {
		emoji = "❗️"; // Exclamation emoji for hazardous and severe levels
	} else {
		emoji = "😊"; // Smiley emoji for other levels
	}

	return (
		<article className="widget">
			<div>
				<h4>{heading}</h4>
			</div>
			<CircularProgressbar
				value={aqi}
				text={`${aqi}`}
				maxValue={350}
				styles={buildStyles({
					pathColor: pathColor,
					textColor: pathColor,
				})}
			/>
			<div
				className="aqi-level"
				style={{
					color: pathColor,
				}}
			>
				{aqiLevel}
			</div>
			<p>
				{emoji} Let&apos;s take a breath of fresh air! Keep track of Air Quality for a healthier life. {emoji}
			</p>
			<p>
				<span style={{ color: pathColor }}>Health Impact:</span> {getHealthImpact(aqiLevel)}
			</p>
		</article>
	);
};

export default Dashboard;

function getHealthImpact(aqiLevel) {
	switch (aqiLevel) {
		case "Hazardous":
			return "Avoid outdoor activities and stay indoors.";
		case "Severe":
			return "Limit outdoor activities, especially if you have respiratory issues.";
		case "Unhealthy":
			return "Sensitive individuals may experience health effects; everyone should limit prolonged outdoor exertion.";
		case "Poor":
			return "Some individuals may experience health effects; sensitive groups may experience more serious effects.";
		case "Moderate":
			return "Air quality is acceptable; however, there may be some health concern for a small number of people who are unusually sensitive to air pollution.";
		case "Good":
			return "Air quality is satisfactory, and air pollution poses little or no risk.";
		default:
			return "";
	}
}

// http://api.airvisual.com/v2/countries?key={{YOUR_API_KEY}}

const calculateAqiLevel = (aqi) => {
	let aqiLevel = "";

	if (aqi >= 401 && aqi <= 500) {
		aqiLevel = "Hazardous";
	} else if (aqi >= 301 && aqi <= 400) {
		aqiLevel = "Severe";
	} else if (aqi >= 201 && aqi <= 300) {
		aqiLevel = "Unhealthy";
	} else if (aqi >= 101 && aqi <= 200) {
		aqiLevel = "Poor";
	} else if (aqi >= 51 && aqi <= 100) {
		aqiLevel = "Moderate";
	} else {
		aqiLevel = "Good";
	}

	return aqiLevel;
};
