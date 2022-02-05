const res = require("express/lib/response");
const fs = require("fs");
exports.getTeams = (req, res, next) => {
	fs.readFile("./teams.json", (err, tms) => {
		if (err) {
			console.log("ran into team err" + err);
			return;
		}
		try {
			const teams = Object.values(JSON.parse(tms));
			// console.log(teams);
			res.status(200).json(teams);
		} catch (error) {
			console.log(error);
		}
	});
};
exports.getTeam = (req, res, next) => {
	const teamId = req.params.teamId;
	fs.readFile("./teams.json", "utf8", (err, tem) => {
		if (err) {
			console.log(err);
			return;
		}
		try {
			const team = JSON.parse(tem)[teamId];
			// console.log(team);
			res.status(200).json(team);
		} catch (err) {
			console.log(err);
		}
	});
};
exports.getPlayers = (req, res, next) => {
	const teamId = req.params.teamId;
	fs.readFile("./players.json", "utf8", (err, plyrs) => {
		if (err) {
			console.log("ran into team err" + err);
			return;
		}
		try {
			const allPlayers = JSON.parse(plyrs);
			const players = Object.values(allPlayers).filter(
				(e) => e.team === teamId
			);
			res.status(200).json(players);
		} catch (error) {
			console.log(error);
		}
	});
};
