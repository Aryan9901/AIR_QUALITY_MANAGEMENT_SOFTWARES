const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const axios = require('axios');
const http = require('http');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

let lat_global = "19.076"
let lon_global = "72.8777"
let city_global = 'mumbai'

async function getCityCoordinates(cityName) {
    try {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=64d454e51d00dd771b37cbdc3c1c6c4a`;
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data.length > 0) {
            latix=response.data[0].lat;
            lonix=response.data[0].lon;
            lat_global = response.data[0].lat;
            lon_global = response.data[0].lon;
            console.log(`data : ${response.data[0].lat}`);
        console.log(`data : ${response.data[0].lon}`);
            return { latix, lonix };
        } else {
            throw new Error("City data not found.");
        }
    } catch (error) {
        throw new Error(`Error fetching city coordinates: ${error.message}`);
    }
}

function getHealthImpact(aqiLevel) {
    switch (aqiLevel) {
         case "Hazardous":
              return "Avoid outdoor activities and stay indoors.";
         case "Severe":
              return "Limit outdoor activities, especially if you have respiratory issues.";
         case "Unhealthy":
              return "Sensitive individuals may experience health effects; everyone should limit prolonged outdoor exertion.";
         case "Poor":
              return "Some individuals may experience health effects; sensitive groups may experience more serious effects.";
         case "Moderate":
              return "Air quality is acceptable; however, there may be some health concern for a small number of people who are unusually sensitive to air pollution.";
         case "Good":
              return "Air quality is satisfactory, and air pollution poses little or no risk.";
         default:
              return "";
    }
}

const calculateAqiLevel = (aqi) => {
    let aqiLevel = "";

    if (aqi >= 401 && aqi <= 500) {
         aqiLevel = "Hazardous";
    } else if (aqi >= 301 && aqi <= 400) {
         aqiLevel = "Severe";
    } else if (aqi >= 201 && aqi <= 300) {
         aqiLevel = "Unhealthy";
    } else if (aqi >= 101 && aqi <= 200) {
         aqiLevel = "Poor";
    } else if (aqi >= 51 && aqi <= 100) {
         aqiLevel = "Moderate";
    } else {
         aqiLevel = "Good";
    }

    return aqiLevel;
}

// Function to fetch HTTP data and log it
// function fetchData(url) {
async function fetchData(city){
    let x = await getCityCoordinates(city);
    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat_global}&lon=${lon_global}&appid=64d454e51d00dd771b37cbdc3c1c6c4a`; 
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
           
            // A chunk of data has been received.
            res.on('data', (chunk) => {
                data += chunk;
            });
           
            // The whole response has been received.
            res.on('end', () => {
                
                resolve(data);
                // const jsonData = data.json();
            });
        }).on('error', (err) => {
            reject(`Error fetching data: ${err.message}`);
        });
    });
}

function getMaxPollutant(components) {
    const maxPollutant = Math.max(
        components.so2,
        components.no2,
        components.o3,
        components.pm2_5,
        components.pm10
    );
    return maxPollutant;
}

const url1 = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=64d454e51d00dd771b37cbdc3c1c6c4a";


client.on('messageCreate' , async (message) => {

    if (message.author.bot) return;
    const args = message.content.split(' ');
    const start = args[0];
    args.shift();
    let city = args.join(" ");
    console.log(city);

        if (start === ("!fetch")) {
        try {
            // fetchData(url)
            fetchData(city)
            .then((data) => {
            const jsonData = JSON.parse(data)
                if (jsonData && jsonData.list && jsonData.list.length > 0) {
                    const components = jsonData.list[0].components;
                    const maxPollutant = getMaxPollutant(components);
                    let aqi_impact = calculateAqiLevel(maxPollutant);
                    let aqi_impact_level = getHealthImpact(aqi_impact);

                    const replyMessage = 
                    `AQI of: ${city}\nCO: ${components.co} µg/m3, \nSO2: ${components.so2} µg/m3, \nNO2: ${components.no2} µg/m3, \nO3: ${components.o3} µg/m3, \nPM2.5: ${components.pm2_5} µg/m3, \nPM10: ${components.pm10} µg/m3`;

                    const replyMessageWithMax = `${replyMessage}\nAir Qulaity Index: ${maxPollutant}\n\n Health Impact ${aqi_impact_level}`;

                    message.reply(replyMessageWithMax);

                    // You can use jsonData here to access all data in the JSON object
                } else {
                    console.error("JSON data is empty or does not have the expected structure.");
                    message.reply('Please Enter a valid City');

                }
            })
            .catch((error) => {console.error(error);});
        } catch (error) {
            console.error("Error generating short ID:", error);
            message.reply("Failed to generate AQI");
        }
    } else {
        message.reply("Message doesn't start with !fetch");

    }
});

client.login(process.env.TOKEN);

