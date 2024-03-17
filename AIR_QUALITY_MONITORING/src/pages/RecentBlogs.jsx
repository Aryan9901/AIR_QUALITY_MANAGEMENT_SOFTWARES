/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const RecentBlogs = () => {
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="recentBlogs">
				<h2>Recent Blogs</h2>
				<p>Here Are Some Resources That You Can Go Through To Find Out More About Air Quality & Pollution.</p>
				<div className="blogContainer">
					<BlogsCard img="blogimg1.webp" id={0} date="06 March 2024" heading="The impact of air pollution on India's tourism industry" />
					<BlogsCard img="blogimg2.jpg" id={1} date="02 Jan 2024" heading="Winter Air Pollution in India: What to Expect in 2023" />
					<BlogsCard img="blogimg4.png" id={2} date="29 Feb 2024" heading="How poor air quality affects individual’s performance? " />
					<BlogsCard img="blogimg5.jpg" id={3} date="08 Mar 2024" heading="The Urban Heat Island Effect: Rising Temperatures in Cities" />
					<BlogsCard img="blogimg6.jpg" id={4} date="25 Jan 2024" heading="The Urban Heat Island Effect: Rising Temperatures in Cities" />
					<BlogsCard img="blogimg7.jpg" id={5} date="17 Mar 2024" heading="The Urban Heat Island Effect: Rising Temperatures in Cities" />
				</div>
			</main>
		</div>
	);
};

const BlogsCard = ({ img, date, heading, id }) => {
	return (
		<div className="BlogCard">
			<img src={img} alt="blog image" />
			<h4>{date}</h4>
			<Link to={`/blogs/${id}`}>{heading}</Link>
		</div>
	);
};

export default RecentBlogs;
