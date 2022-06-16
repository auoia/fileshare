const express = require("express");

const app = express();

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", (req,res, next) => {
	

	const username = req.body.username;
	const password = req.body.password;


	return res.redirect("/signup");
});
