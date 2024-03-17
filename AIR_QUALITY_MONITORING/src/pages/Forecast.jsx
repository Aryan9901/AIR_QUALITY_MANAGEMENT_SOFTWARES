import AdminSidebar from "../components/AdminSidebar";

const Forecast = () => {
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="forecast">
				<h2>AQI - FORECAST</h2>
				<p>Looking for any air quality monitoring data or solutions? We are always here to help you.</p>
				<div className="forecastContainer">
					<div className="table">
						<div className="tableHeading">
							<div className="tableHeadRow">
								<div className="th">Date</div>
								<div className="th">PM 2.5</div>
								<div className="th">PM10</div>
								<div className="th">NO 2</div>
								<div className="th">SO 2</div>
								<div className="th">NH3</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Forecast;
