const { ApiError } = require("../utils/ApiError.js");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

exports.authUser = catchAsyncErrors(async (req, res, next) => {
	try {
		const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

		// console.log(token);
		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decodedToken?._id).select("-password");

		if (!user) {
			throw new ApiError(401, "Invalid Access Token");
		}

		req.user = user;
		next();
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});
