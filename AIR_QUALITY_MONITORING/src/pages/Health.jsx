import AdminSidebar from "../components/AdminSidebar";

const Health = () => {
	// const { t } = useTranslation();
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="health">
				<h2>Breathe Easy: Track Air Quality, Live Healthy 🌱</h2>
				<h4>Empowering You to Make Informed Choices for a Healthier Tomorrow</h4>
				<div>
					<p>
						Air pollution is the single largest environmental health risk in Europe and a major cause of premature death and disease.
						Latest estimates by the European Environment Agency (EEA) show that fine particulate matter (PM2.5) continues to cause the
						most substantial health impacts.
					</p>
				</div>
				<h3>
					Health impacts of High <span>Air Quality Index</span>
				</h3>
				<img src="/healthdiag.png" alt="health diagram" />
				<div className="deaths">
					<h5>238,000 premature deaths</h5>
					<p>due to fine particulate matter above WHO-guideline level</p>
				</div>
				<div className="youtubeContainer">
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/ycBoiBwHuGE?si=iym2Ax-4pN7XYwzY"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/6IKaUTYWtvg?si=-90Z6yjAURC7vgFi"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/Aabz4MHXgT4?si=MoQ1D86isTiKmlE4"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/GVBeY1jSG9Y?si=TwbcQavZkGprjMUb"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/rn9eUIbqCPU?si=2m5Sf6Qo7BOMcBYc"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/Tds3k97aAzo?si=wcUdB29BXB7K8b5L"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</div>
			</main>
		</div>
	);
};

export default Health;
