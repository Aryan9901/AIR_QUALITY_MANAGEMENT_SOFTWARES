import AdminSidebar from "../components/AdminSidebar";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="contact">
				<h2>AQI - Contact INFO</h2>
				<p>Looking for any air quality monitoring data or solutions? We are always here to help you.</p>
				<div>
					<BsFillTelephoneFill />
					<div>
						<h4>Phone Number:</h4>
						<p>(+91) 7391-XXXX-XXXX</p>
					</div>
				</div>
				<div>
					<MdEmail />
					<div>
						<h4>Email Address:</h4>
						<p>myairvisual.vaayu@gmail.com</p>
					</div>
				</div>
				<div>
					<FaLocationDot />
					<div>
						<h4>Office Location:</h4>
						<p>Crown Heights, 7th Floor, 706, Sector - 10, Rohini, New Delhi 110085, India</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Contact;
