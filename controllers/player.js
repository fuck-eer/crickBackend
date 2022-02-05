// const players = require("../players.json");
const fs = require("fs");
exports.getPlayer = (req, res, next) => {
	const playerId = req.params.playerId;
	//file read
	fs.readFile("./players.json", "utf8", (err, plrs) => {
		if (err) {
			console.log("ran into problem:" + err);
			return;
		}
		try {
			const players = JSON.parse(plrs);
			res.status(200).json(players[playerId]);
		} catch (er) {
			console.log(er);
		}
	});
};

exports.addPlayer = (req, res, next) => {
	const player = {
		name: req.body.name,
		team: req.body.team || "t1",
		imageUrl:
			req.body.imageUrl ||
			"https://images.vexels.com/media/users/3/140748/isolated/lists/5b078a59390bb4666df98b49f1cdedd0-male-profile-avatar.png",
		position: req.body.position,
		id: req.body.id || "",
	};
	// console.log(player);
	if (!player.id) {
		const id = `${player.team}p${Math.ceil(Math.random() * 1000)}`;
		player.id = id;

		fs.readFile("./players.json", "utf8", (err, plrs) => {
			if (err) {
				console.log("ran into problem:" + err);
				return;
			}
			try {
				const players = JSON.parse(plrs);
				players[id] = player;
				console.log(player);
				console.log(players);
				fs.writeFile("./players.json", JSON.stringify(players), (err) =>
					console.log(err)
				);
				res.status(200).json({ id: player.id });
			} catch (er) {
				console.log(er);
			}
		});
	}

	fs.readFile("./players.json", "utf8", (err, plrs) => {
		if (err) {
			console.log("ran into problem:" + err);
			return;
		}
		try {
			const players = JSON.parse(plrs);
			players[player.id] = { ...player };
			// console.log(player);
			// console.log(players);
			fs.writeFile("./players.json", JSON.stringify(players), (err) =>
				console.log(err)
			);
			res.status(200).json({ id: player.id });
		} catch (er) {
			console.log(er);
		}
	});
};
exports.deletePlayer = (req, res, next) => {
	const playerId = req.params.playerId;

	fs.readFile("./players.json", "utf8", (err, plrs) => {
		if (err) {
			console.log("ran into problem:" + err);
			return;
		}
		try {
			const players = JSON.parse(plrs);
			delete players[playerId];
			fs.writeFile("./players.json", JSON.stringify(players), (err) =>
				console.log(err)
			);
			res.status(200).json({ id: playerId });
		} catch (er) {
			console.log(er);
		}
	});
};
