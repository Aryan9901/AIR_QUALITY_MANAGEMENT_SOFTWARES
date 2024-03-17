const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

const connectDb = async () => {
	try {
		const connectionInstance = await mongoose.connect(`mongodb+srv://hussainamaan87:hussain@cluster0.fg5lngw.mongodb.net//crm`);
		console.log(`MongoDb connection: || DB HOST:  ${connectionInstance.connection.host}`);
	} catch (error) {
		console.error("Error...." + error);
		// throw error;
		process.exit(1);
	}
}; 

module.exports = connectDb;
