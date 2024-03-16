import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import { Bounce, ToastContainer } from "react-toastify";

// ** pages lazy import()
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AqiIndex = lazy(() => import("./pages/AqiIndex"));
const RecentBlogs = lazy(() => import("./pages/RecentBlogs"));
const Blog = lazy(() => import("./pages/Blog"));
const Health = lazy(() => import("./pages/Health"));
const Contact = lazy(() => import("./pages/Contact"));

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/aqi/index" element={<AqiIndex />} />
					<Route path="/blogs" element={<RecentBlogs />} />
					<Route path="/blogs/:id" element={<Blog />} />
					<Route path="/health" element={<Health />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="*" element={<h2>Page Not Found</h2>} />
				</Routes>
				<ToastContainer
					position="bottom-center"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					transition={Bounce}
				/>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
