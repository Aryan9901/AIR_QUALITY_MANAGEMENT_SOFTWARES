const dotenv = require("dotenv");
const connectDB = require("./db/index.js");
const app = require("./app");
const insertAqiData = require("./insertaqi.js")
const cron = require('node-cron');
const http = require("http")
const axios = require("axios");
dotenv.config({
	path: "./.env",
});

let lat_global = "19.076"
let lon_global = "72.8777"
let city_global = 'mumbai'

async function getCityCoordinates(cityName) {
    try {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=64d454e51d00dd771b37cbdc3c1c6c4a`;
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data.length > 0) {
            lat_global = response.data[0].lat;
            lon_global = response.data[0].lon;
            console.log(`data : ${response.data[0].lat}`);
        console.log(`data : ${response.data[0].lon}`);
            return;
        } else {
            throw new Error("City data not found.");
        }
    } catch (error) {
        throw new Error(`Error fetching city coordinates: ${error.message}`);
    }
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
const url1 = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=64d454e51d00dd771b37cbdc3c1c6c4a";



function performTask() {
    console.log("Performing task at xx:00");
    // Add your task logic here
    fetchData('Bhopal') // Fetch air quality data for Bhopal
		.then((data) => {
			const jsonData = JSON.parse(data);
			if (jsonData && jsonData.list && jsonData.list.length > 0) {
				const components = jsonData.list[0].components;

				const document = {
					city: 'Bhopal',
					date: new Date(),
					param: components
				};

				insertAqiData('AQI', 'Bhopal', document); // Insert air quality data into MongoDB
                console.log('inserted');
			} else {
				console.error("JSON data is empty or does not have the expected structure.");
			}
		})
		.catch((error) => {
			console.error(error);
		});
        fetchData('Delhi') // Fetch air quality data for Bhopal
		.then((data) => {
			const jsonData = JSON.parse(data);
			if (jsonData && jsonData.list && jsonData.list.length > 0) {
				const components = jsonData.list[0].components;

				const document = {
					city: 'Bhopal',
					date: new Date(),
					param: components
				};

				insertAqiData('AQI', 'Delhi', document); // Insert air quality data into MongoDB
                console.log('inserted');
			} else {
				console.error("JSON data is empty or does not have the expected structure.");
			}
		})
		.catch((error) => {
			console.error(error);
		});
        fetchData('Noida') // Fetch air quality data for Bhopal
		.then((data) => {
			const jsonData = JSON.parse(data);
			if (jsonData && jsonData.list && jsonData.list.length > 0) {
				const components = jsonData.list[0].components;

				const document = {
					city: 'Bhopal',
					date: new Date(),
					param: components
				};

				insertAqiData('AQI', 'Noida', document); // Insert air quality data into MongoDB
                console.log('inserted');
			} else {
				console.error("JSON data is empty or does not have the expected structure.");
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

connectDB()
	.then(() => {
		app.listen(8000, () => {
			console.log(`⚙️  Server is running at port : ${8000}`);
		});
	})
	.catch((err) => {
		console.log("MONGO db connection failed !!! ", err);
	});

    cron.schedule('*/5 * * * * *', performTask);

