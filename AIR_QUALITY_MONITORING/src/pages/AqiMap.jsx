import AdminSidebar from "../components/AdminSidebar";
import Bar from "../components/Bar";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const AqiMap = () => {
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard">
				<Bar />
				<MapContainer center={[19.075984, 72.877656]} zoom={13} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[51.505, -0.09]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			</main>
		</div>
	);
};

export default AqiMap;
