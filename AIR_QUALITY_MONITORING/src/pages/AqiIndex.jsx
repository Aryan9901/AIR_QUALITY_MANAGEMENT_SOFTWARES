/* eslint-disable react/prop-types */
import AdminSidebar from "../components/AdminSidebar";

const AqiIndex = () => {
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="aqiIndex">
				<h2>Air Quality Index</h2>
				<p>Know about the category of air quality index (AQI) your ambient air falls in and what it implies.</p>
				<div className="aqiContainer">
					<AqiCard
						range="0 - 50"
						text="The air is fresh and free from toxins. People are not exposed to any health risk."
						level="Good"
						img="/public/cartton_shape_4.webp"
						color="#39A033"
					/>
					<AqiCard
						range="51 - 100"
						text="Acceptable air quality for healthy adults but mild threat to sensitive individuals."
						level="Good"
						img="/public/cartton_shape_3.webp"
						color="#D4CA2F"
					/>
					<AqiCard
						range="101 - 200"
						text="Inhaling such air can cause slight discomfort and difficulty in breathing."
						level="Good"
						img="/public/cartton_shape_2.webp"
						color="#e75834"
					/>
					<AqiCard
						range="201 - 300"
						text="This could be typically problematic for children, pregnant women and the elderly."
						level="Good"
						img="/public/cartton_shape_5.webp"
						color="#EA519F"
					/>
					<AqiCard
						range="301 - 400"
						text="Exposure to air can cause chronic morbidities or even organ impairment."
						level="Good"
						img="/public/cartton_shape_1.webp"
						color="#975AA0"
					/>
					<AqiCard
						range="401 - 500"
						text="Beware! Your life is in danger. Prolonged exposure can lead to premature death."
						level="Good"
						img="/public/cartton_shape_6.webp"
						color="#BF2133"
					/>
				</div>
			</main>
		</div>
	);
};

export default AqiIndex;

const AqiCard = ({ img, range, text, color, level }) => {
	return (
		<div className="aqiCard" style={{ backgroundColor: color }}>
			<img src={img} />
			<h3>
				{level} <span> {range} </span>
			</h3>
			<p>{text}</p>
		</div>
	);
};
