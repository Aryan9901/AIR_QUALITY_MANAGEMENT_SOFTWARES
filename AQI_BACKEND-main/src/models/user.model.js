const mongoose = require("mongoose");

const { Schema } = mongoose;

// user Schema
exports.aqiSchema = new Schema(
	{
		city: {
			type:String,
			required:[true,"City is Required"],
		 },
		date:{
			type:Date,
			default:Date.now(),
			required:[true,"Date is Required"],
		},
		param:{
			so2:Number,
			no2:Number,
			o3:Number,
			pm25:Number,
			pm10:Number,
			co:Number 
		}
	}
);

// const Aqi = mongoose.model("aqi", aqiSchema);
// module.exports = Aqi;
