const mongoose = require("mongoose");

// Function to fetch data for a given city
async function fetchCityData(cityName) {
    try {
        // Dynamically get the model corresponding to the city name
        const cityModel = mongoose.model(cityName);
        // Fetch all documents from the city model
        const data = await cityModel.find({});
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching city data:", error);
        throw error;
    }
}

fetchCityData("Bhopal");