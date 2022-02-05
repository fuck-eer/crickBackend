const express = require("express");
const teamController = require("../controllers/team");
const route = express.Router();

route.get("/allTeams", teamController.getTeams);

route.get("/:teamId", teamController.getTeam);

route.get("/:teamId/showPlayers/", teamController.getPlayers);

module.exports = route;
