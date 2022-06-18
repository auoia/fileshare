const Users = require("../models/users");
const express = require("express");

const router = express.Router();
// Users(saltRounds, minUsernameLength, minPasswordLength)
const User = new Users(12, 4, 6);

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup", (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	User.createUser(username, email, password, (err, result) => {
		if (err) {
			console.log(err.message)
			return;
		}

		console.log("result: " + result);
	});
	// Promise.resolve(resultCreateUser).then(console.log(resultCreateUser));
	// 	console.log(val);
	// }, function(val) {
	// 	console.log(val);
	// })

	return res.redirect("/signup");
});

module.exports = router;
