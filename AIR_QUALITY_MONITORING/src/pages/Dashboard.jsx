/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import AdminSidebar from "../components/AdminSidebar";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { IoIosPartlySunny, IoIosSettings } from "react-icons/io";
import Bar from "../components/Bar";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdWaterDrop } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useGeolocated } from "react-geolocated";

// getCountryNames
const Dashboard = () => {
	const [aqi, setAqi] = useState();
	const [pollutants, setPollutants] = useState({});
	const [query, setQuery] = useState("");
	const [searchedLat, setSearchedLat] = useState("");
	const [searchedLong, setSearchedLong] = useState("");
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
			// console.log(data);
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
			// console.log(data);
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
				{/* <section className="widget-container">
					<WidgetItem percent={2.8} value={340000} heading="Income" color="rgba(0,115,255)" />
					<WidgetItem percent={-2.5} value={400} heading="Paid" color="rgba(0,198,202)" />
					<WidgetItem percent={4} value={23000} heading="Invoices" color="rgba(0,115,255)" />
				</section> */}
				{/* <section className="countries">
					<select>
						{countries?.map((country) => (
							<option key={country.country} value={country.country}>
								{country.country}
							</option>
						))}
					</select>
				</section> */}
				<section className="mapContainer">
					<div className="HomeCard">
						<div className="header">
							<h3>
								<FaLocationArrow />
								Home
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
										<AqiLevel value={cityPollutant.co} unit="ug/m^2" parameter="PM 2.5" color={"red"} />
										<AqiLevel value={cityPollutant.no2} unit="ug/m^2" parameter="PM 2.5" color={"green"} />
										<AqiLevel value={cityPollutant.pm10} unit="ug/m^2" parameter="PM 2.5" color={"salmon"} />
										<AqiLevel value={cityPollutant.so2} unit="ug/m^2" parameter="PM 2.5" color={"cyan"} />
										<AqiLevel value={cityPollutant.no2} unit="ug/m^2" parameter="PM 2.5" color={"cyan"} />
									</>
								)}
							</div>
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
						<div className="maindata">
							<div className="graph">
								<CircularProgressbar value={aqi} text={`${aqi}`} />
							</div>
							<div className="data">
								<AqiLevel value={pollutants.pm2_5} unit="ug/m^2" parameter="PM 2.5" color={"yellow"} />
								<AqiLevel value={pollutants.co} unit="ug/m^2" parameter="PM 2.5" color={"red"} />
								<AqiLevel value={pollutants.no2} unit="ug/m^2" parameter="PM 2.5" color={"green"} />
								<AqiLevel value={pollutants.pm10} unit="ug/m^2" parameter="PM 2.5" color={"salmon"} />
								<AqiLevel value={pollutants.so2} unit="ug/m^2" parameter="PM 2.5" color={"cyan"} />
								<AqiLevel value={pollutants.no2} unit="ug/m^2" parameter="PM 2.5" color={"cyan"} />
							</div>
						</div>
					</section>
				</section>
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

export const WidgetItem = ({ heading, value, percent }) => {
	const [selectedOption, setSelectedOption] = useState("Today");
	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
	};
	return (
		<article className="widget">
			<div>
				<i>
					<IoIosSettings />
				</i>
				<h4>{heading}</h4>
				<p>
					<select value={selectedOption} onChange={handleOptionChange}>
						<option value="Today">Today</option>
						<option value="LastWeek">Last Week</option>
						<option value="LastMonth">Last Month</option>
						<option value="LastYear">Last Year</option>
						<option value="All">All</option>
					</select>
				</p>
			</div>
			<h2>&#8377; {Math.abs(value)}</h2>
			{percent > 0 ? (
				<h5 className="green">
					<HiTrendingUp /> + {percent}%
				</h5>
			) : (
				<h5 className="red">
					<HiTrendingDown /> {Math.abs(percent)}%
				</h5>
			)}
		</article>
	);
};

export default Dashboard;

// http://api.airvisual.com/v2/countries?key={{YOUR_API_KEY}}
