const express = require("express");
const initial = require("./routes/initial");
const path = require("path");
const bodyParser = require("body-parser");

app = express();

// set view directory and set view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", initial);
// app.use("/files", files);

app.listen(3000, () => {
	console.log("App started on port 3000");
});
