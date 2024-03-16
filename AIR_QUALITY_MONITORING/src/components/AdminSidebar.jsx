/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillFileText, AiTwotoneCar } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
	const location = useLocation();

	const [showModal, setShowModal] = useState(false);
	const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1000);

	const resizeHandler = () => {
		setPhoneActive(window.innerWidth < 1000);
	};

	useEffect(() => {
		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return (
		<>
			{phoneActive && (
				<button id="hamburger" onClick={() => setShowModal(true)}>
					<HiMenuAlt4 />
				</button>
			)}

			<aside
				style={
					phoneActive
						? {
								width: "20rem",
								height: "100vh",
								position: "fixed",
								top: 0,
								left: showModal ? "0" : "-20rem",
								transition: "all 0.5s",
						  }
						: {}
				}
			>
				{/* <h2>Logo.</h2> */}
				<img
					src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png"
					alt="user image"
				/>
				<h2>Marvin McKinny</h2>
				<h5>President of Sales</h5>
				<DivOne location={location} />

				<button id="logout-sidebar">Logout</button>

				{phoneActive && (
					<button id="close-sidebar" onClick={() => setShowModal(false)}>
						Close
					</button>
				)}
			</aside>
		</>
	);
};

const DivOne = ({ location }) => (
	<div>
		<ul>
			<Li url="/dashboard" text="Home" Icon={RiDashboardFill} location={location} />
			<Li url="/invoice" text="AQI Ranking" Icon={BsFileText} location={location} />
			<Li url="/cars" text="Weather Ranking" Icon={AiTwotoneCar} location={location} />
			{/*  TODO: NEED TO CHANGE THE NAME OF THE MONITOR TAB */}
			<Li url="/profile/owner" text="Monitor" Icon={AiFillFileText} location={location} />
			<Li url="/aqi/map" text="Air Quality Map" Icon={AiFillFileText} location={location} />
			<Li url="/add/new" text="Contact Us" Icon={IoPersonAdd} location={location} />
			{/* <Li url="/settings" text="Settings" Icon={AiFillFileText} location={location} /> */}
		</ul>
	</div>
);
const Li = ({ url, location, text, Icon }) => (
	<li
		style={{
			backgroundColor: location.pathname.includes(url) ? "white" : "transparent",
		}}
	>
		<Link
			to={url}
			style={{
				fontWeight: location.pathname.includes(url) ? "bold" : "400",
			}}
		>
			<Icon
				style={{
					color: location.pathname.includes(url) ? "black" : "white",
				}}
			/>
			{text}
		</Link>
	</li>
);

export default AdminSidebar;
