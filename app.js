const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const teamRoutes = require("./routes/team");
const playerRoutes = require("./routes/player");

const SERVERPORT = process.env.PORT || 3050;
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	next();
});
app.use(bodyParser.json());
app.use("/team", teamRoutes);
app.use("/player", playerRoutes);
app.get("/", (req, res, next) => {
	res.status(200).json({ message: "Server is up and runing" });
});
//error handling
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = err.message || "something went wrong!";
	const errorData = err.data || "something went wrong!";
	res.status(statusCode).json({ message: errorMessage, data: errorData });
});

app.listen(SERVERPORT);
