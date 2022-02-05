const express = require("express");
const playerController = require("../controllers/player");
const route = express.Router();

route.post("/addPlayer/", playerController.addPlayer);

route.get("/getPlayer/:playerId", playerController.getPlayer);

route.get("/deletePlayer/:playerId", playerController.deletePlayer);

module.exports = route;
