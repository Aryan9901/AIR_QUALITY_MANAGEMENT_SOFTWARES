import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const blogdata = [
	{
		img: "/blog1.jpeg",
		title: "The impact of air pollution on India’s tourism industry",
		desc: "India is a popular tourist destination, with a rich culture, diverse landscapes, and stunning historical sites. However, air pollution is a major problem in India, and it is having a significant impact on the tourism sector.",
		section: "Why is air pollution a problem for India’s tourism sector?",
		para: "Air pollution can have a negative impact on tourists in a number of ways. It can make it difficult to breathe and exercise, and it can cause a range of health problems, including respiratory infections, heart disease, and cancer. Air pollution can also reduce \n\n visibility, making it difficult to enjoy the scenery and attractions. In addition, air pollution can damage historical sites and monuments. The pollutants in the air can react with the materials used to construct these sites, causing them to erode and deteriorate.",
	},
	{
		img: "/blogimg2.jpg",
		title: "Winter Air Pollution in India: What to Expect in 2023",
		desc: "Winter air pollution in India is a major public health problem. It is estimated that air pollution causes over 1 million deaths in India each year. The winter months are particularly bad for air pollution, as the air becomes cooler and more stagnant, which traps pollutants in the atmosphere.",
		section: "Expectations for winter air pollution in India in 2023",
		para: "Based on the current trends, it is expected that winter air pollution in India in 2023 will be severe. This is especially true in North India, but other parts of the country are also at risk.\n\n\n There are a number of factors that suggest that winter air pollution in India in 2023 could be worse than in previous years. ",
	},
	{
		img: "/blogimg4.png",
		title: "How poor indoor air quality affects individual’s performance? ",
		desc: "We mostly spend our time indoors at home, school, or work. Hence, we try to keep it clean and well-ventilated to have better health. However, air pollution exists in even the cleanest homes. Household air pollution negatively impacts an individual’s health and performance. Thus, know how poor indoor air quality affects individual’s performance.\n\n\nEvery year, indoor air pollution takes many lives. Since, as per data by WHO (World Health Organization), IAQ (Indoor Air quality) has caused an estimated 3.2 million deaths per year. With it, one more report by them shows that over 2.3 billion people use solid fuels for cooking in their houses. Hence, it emits various pollutants in the household.\n\nLet us delve into indoor air pollution! Know about health issues, pollutants, and solutions to control pollution.",
		section: "What is poor indoor air quality and its sources?",
		para: "When dangerous pollutants are found in the air inside our indoor areas, it is referred to as indoor air pollution. We spend most of our time inside as in school, home, offices, or any other indoor space. Hence, it is detrimental for us to inhale these toxins. Thus, it is necessary to take steps to control and protect yourself from exposure.",
	},
	{
		img: "/blogimg5.jpg",
		title: "The Urban Heat Island Effect: Rising Temperatures in Cities",
		desc: "Picture this: a bustling cityscape with towering buildings, busy streets, and a constant hum of activity. As the sun beats down on the concrete jungle, the heat intensifies, creating an invisible barrier that seems to trap warmth within the city limits. This phenomenon, known as the urban heat island effect, has become a pressing concern in our modern world. It’s as if a dome, constructed by a culmination of carbon emissions, confined spaces, and limited ventilation, encapsulates the city, preventing the heat from escaping. The consequences are far-reaching, impacting energy consumption, public health, and the environment. In this blog, we delve into the intricacies of the urban heat island effect, exploring its causes, its impacts, and the innovative strategies being employed to combat it. ",
		section: "What is the Urban Heat Island Effect?",
		para: "Have you ever wondered why summers in the city feel stiflingly hot, while nearby suburbs enjoy slightly cooler temperatures? The answer lies in a phenomenon called the urban heat island effect. Simply put, cities tend to be significantly hotter than their surrounding suburban areas.\n\n\nThe intricate web of factors contributing to this phenomenon can be explained by the unique characteristics of urban environments. From the abundance of concrete and asphalt to the compact arrangement of buildings, cities inadvertently create a heat-trapping effect that keeps temperatures elevated.",
	},
	{
		img: "/blogimg6.jpg",
		title: "Breathless in the Amazon: How PM2.5 Pollution is Harming Wildlife in Brazil’s Rainforest",
		desc: "The Amazon rainforest is an ecological gem, home to a diverse range of vegetation and fauna. PM2.5 pollution, a type of air pollution that can harm both human and animal health, is increasingly endangering the Amazon. In this blog post, we’ll look at the problem of PM2.5 pollution in the Amazon and how it affects the region’s fauna.\n\n We will examine real-life case studies of damaged species, analyze the long-term effects on the environment, and review the efforts being made to address this urgent problem. Furthermore, we will empower folks with practical tips and solutions to help avoid PM2.5 pollution in the Amazon and maintain its unique species. Join us as we investigate this vital environmental issue and discover more.",
		section: "Introduction to the issue",
		para: "Hidden danger lurks in the Amazon rainforest, where wildlife is being threatened by PM2.5 pollution. These tiny particles, no bigger than a speck of dust, may wreak havoc on both animals’ and humans’ lungs and hearts. The biggest causes of pollution are forest fires, agricultural burning, and industrial operations, and the pollution spreads hundreds of miles and impacts species far beyond its source.\n\n\nForest fires, agricultural burning, and industrial activities all contribute to harmful levels of PM2.5 pollution in the Amazon. These flames are getting more common and deadly as climate change and deforestation intensify, posing an increasing hazard to species hundreds of miles away.",
	},
	{
		img: "/blogimg7.jpg",
		title: "How PM2.5 Pollution is Threatening the Tourism Industry in Bali",
		desc: "Bali’s natural beauty, diverse topography, and unique cultural heritage have made it a highly sought-after tourist destination for people worldwide. Surfing enthusiasts can catch the waves on Bali’s famous beaches. Whereas nature lovers can trek through the island’s lush green mountains.\n\n Additionally, Bali’s rich cultural offerings provide tourists with an opportunity to explore the island’s traditions, architecture, and cuisine. However, in recent years, the island has grappled with a serious environmental issue – PM2.5 pollution. The tiny particles are less than 2.5 micrometers in diameter. They can penetrate deep into the lungs and cause a range of health problems. In this article, I will explore the impact of PM2.5 pollution in Bali and on its tourism industry, its causes, and what can be done to address the problem.\n",
		section: "The Impact of PM2.5 Pollution on Bali’s Tourism Industry",
		para: "The tourism industry is a major contributor to Bali’s economy, with millions of visitors flocking to the island each year. However, PM2.5 pollution has started to take a toll on the industry. Many tourists are now hesitant to visit Bali, especially during the dry season when the pollution levels are at their highest. The haze that hangs over the island can be a major turn-off for visitors who come seeking clear skies and pristine beaches. In addition, the health hazards of PM2.5 pollution are also a concern for tourists, especially those with respiratory problems. \n\n\nThe impact of PM2.5 pollution is not just limited to tourism. It can also have a ripple effect on other industries, such as agriculture and fisheries. The particles can settle on crops and fish, making them unsafe for consumption. This can lead to a loss of income for farmers and fishermen, further exacerbating the economic impact of pollution.",
	},
];

const Blog = () => {
	const params = useParams();
	const id = params.id;

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="blog">
				<img src={blogdata[id].img} alt={blogdata[id].title} />
				<h2>{blogdata[id].title}</h2>
				<h4>{blogdata[id].desc}</h4>
				<h3>{blogdata[id].section}</h3>
				<p>{blogdata[id].para}</p>
			</main>
		</div>
	);
};

export default Blog;
