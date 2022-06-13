const express = require("express");
const users = require("./routes/users");
const path = require("path");
const bodyParser = require("body-parser");

// const files = require("./routes/files");

app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/users", users);
// app.use("/files", files);

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", (req,res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	// console.log(req.query);

	return res.redirect("/signup");
});


app.listen(3000, () => {
	console.log("App started on port 3000");
});
