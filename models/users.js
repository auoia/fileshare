const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");

// development creds for local postgresql database
const cn =  {
	host: "localhost",
	port: 5432,
	database: "fileshare",
	user: "pt",
	password: "fileshare",
	max: 30
}

const db = pgp(cn);

const isUserExist = function (username) {
	db.one("SELECT * FROM users WHERE username = $1",
		[username])
		.then(data => {
			console.log(data.id);
		})
		.catch(error => {
			console.log("Error:", error);
		})
}

// db.one("INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING id", ["besta", "talofa", "eleleiomeauma"])
// 	.then(data => {
// 		console.log(data.id);
// 	})
// 	.catch(error => {
// 		console.log("Error:", error);
// 	})

// saltRounds = 12;
// plaintextPassword = "Hello";
// var myHash = "";
// bcrypt.genSalt(saltRounds, function(err, salt) {
// 	bcrypt.hash(plaintextPassword, salt, function(err, hash) {
// 		console.log("salt: " + salt + "... hash: " + hash);
// 		myHash = hash;
//
// 		bcrypt.compare("Hello", myHash, function(err, result) {
// 			console.log("result: " + result);
// 		});
// 	})
// })


// const files = require("./routes/files");

// const saltRounds = 12;

// db.one("SELECT * FROM users WHERE username = $1",
// 		[username])
// 		.then(data => {
// 			console.log(data.id);
// 		})
// 		.catch(error => {
// 			console.log("Error:", error);
// 		})
// 	// bcrypt.genSalt(saltRounds, function(err, salt) {
// 	// 	// save hash to database
// 	// 	bcrypt.hash(password, salt, function(err, hash) {
// 	// 		console.log("salt: " + salt + "... hash: " + hash);
// 	// 		db.one("INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING id",
// 	// 			[username, hash, "0"])
// 	// 			.then(data => {
// 	// 				console.log(data.id);
// 	// 			})
// 	// 			.catch(error => {
// 	// 				console.log("Error:", error);
// 	// 			})
// 	// 	});
// 	// })