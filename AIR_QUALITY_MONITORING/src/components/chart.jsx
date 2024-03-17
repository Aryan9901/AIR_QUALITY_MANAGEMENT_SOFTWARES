/* eslint-disable react/prop-types */
import {
	Chart as ChartJS,
	PointElement,
	LineElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	ArcElement,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

// registering charts componets
ChartJS.register(Filler, CategoryScale, LineElement, PointElement, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// export function App() {}

// **???  bar Charts --------------------------------

const months = ["January", "February", "March", "April", "May", "June", "July"];

// exporting bar component
export const BarChart = ({
	data_1 = [],
	data_2 = [],
	title_1,
	title_2,
	bgColor_1,
	bgColor_2,
	labels = months,
	horizontal = false,
	legend = false,
	categoryPercentage = 0.6,
}) => {
	const options = {
		responsive: true,
		indexAxis: horizontal ? "y" : "x",
		plugins: {
			legend: {
				position: "top",
				display: legend,
			},
			title: {
				// display: true,
				display: legend,
				text: `${title_1} & ${title_2}`,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: false,
				},
			},
			x: {
				beginAtZero: true,
				grid: {
					display: false,
				},
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: title_1,
				data: data_1,
				backgroundColor: bgColor_1,
				barThickness: "flex",
				barPercentage: 1,
				categoryPercentage,
			},
			{
				label: title_2,
				data: data_2,
				backgroundColor: bgColor_2,
				barThickness: "flex",
				barPercentage: 1,
				categoryPercentage,
			},
		],
	};

	return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />;
};

// **???  Dougnut Charts --------------------------------

export const DougnutChart = ({ labels, data, backgroundColor, cutout, legends = true, offset }) => {
	const doughnutData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor,
				borderWidth: 0,
				offset,
			},
		],
	};

	const doughnutOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: legends,
				position: "bottom",
				labels: {
					padding: 40,
				},
			},
		},
		cutout,
	};

	return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

// **???  Pie Charts --------------------------------

export const PieChart = ({ labels, data, backgroundColor, legends = true, offset }) => {
	const pieChartData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor,
				borderWidth: 1,
				offset,
			},
		],
	};

	const pieChartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: legends,
				position: "bottom",
				labels: {
					padding: 40,
				},
			},
		},
	};

	return <Pie data={pieChartData} options={pieChartOptions} />;
};

// **???  Line Charts --------------------------------

// exporting bar component
export const LineChart = ({ data, label, backgroundColor, borderColor, labels, legend = false }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
				display: legend,
			},
			title: {
				// display: true,
				display: legend,
				text: label,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: false,
				},
			},
			x: {
				beginAtZero: true,
				grid: {
					display: true,
				},
			},
		},
	};

	const lineChartData = {
		labels,
		datasets: [
			{
				label,
				data,
				backgroundColor,
				borderColor,
				fill: true,
			},
		],
	};

	return <Line options={options} data={lineChartData} />;
};
