const express = require("express");

const router = express.Router();

router.get("/", function(req, res) {
	res.send("Welcome to users!");
});

router.get("/:user", function(req, res) {
	res.send("Welcome " + req.params.user + " to your profile!");
});

module.exports = router;
