const pgp = require("pg-promise")();
const argon2 = require("argon2");

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

class User {
	constructor(minUsernameLength, minPasswordLength) {
		this.minUsernameLength = minUsernameLength || 4;
		this.minPasswordLength = minPasswordLength || 6;
	}

	async createUser(username, email, password, done) {
		// email regex pattern from http://emailregex.com based on RFC 5322
		if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			const err = new Error("Email format is incorrect");
			return done(err, null);
		}

		if (username.length < this.minUsernameLength) {
			// console.log("Username must be at least 4 characters");
			const err = new Error("Username must be at least "+ this.minUsernameLength +" characters");
			return done(err, null);
		}

		if (!username.match(/^[a-z0-9]+$/i)) {
			// console.log("Username must be alphanumeric")
			const err = new Error("Username must alphanumeric");
			return done(err, null);
		}

		if (password.length < this.minPasswordLength) {
			// console.log("Password must be at least 6 characters");
			const err = new Error("Password must be at least "+ this.minPasswordLength +" characters");
			return done(err, null);
		}

		argon2.hash(password)
			.then(hash => {
				db.one("INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id",
					[username, email, hash])
					.then(data => {
						return done(null, data.id);
					})
					.catch(err => {
						return done(err, null);
					})
			})
			.catch(err => {
				return done(err, null);
			})				
	}

	authenticateUser(username, password, done) {
		db.one("SELECT id,username,password FROM users WHERE username = $1",
			[username])
			.then(data => {
				argon2.verify(data.password, password)
					.then(passwordMatch => {
						if (passwordMatch) {
							console.log("Correct password");
						} else {
							console.log("Wrong password");
						}
					})
					.catch(err => {
						return done(err, null);
					});
			})
			.catch(error => {
				// console.log("error: " + error);
				return done(error, null);
			})
	}

	
}

module.exports = User;
// if the user exists, return user's ID
// function isUserExist(username) {
// 	db.one("SELECT * FROM users WHERE username = $1",
// 		[username])
// 		.then(data => {
// 			console.log(data.id);
// 		})
// 		.catch(error => {
// 			console.log("Error:", error);
// 		})
// }

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
// 		}