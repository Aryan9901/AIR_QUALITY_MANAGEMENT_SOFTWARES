const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { generatedErrors } = require("./middlewares/errors");
const { ApiError } = require("./utils/ApiError");

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// models import 
const User = require("./models/user.model.js");


// routes import

const userRouter = require("./routes/user.routes.js");

//routes declare
app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
	next(new ApiError(404, `Requested URL Not Found ${req.url}`));
});
app.use(generatedErrors);

module.exports = app;
