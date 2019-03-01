const express = require("express");
const mongoose = require("mongoose");
// Deal with file path
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/api/items");

// Create express app
const app = express();

// Middeleware
app.use(bodyParser.json());
//  DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
	.connect(db)
	.then(() => {
		console.log("MongoDb Connected...");
	})
	.catch(err => {
		console.log(err);
	});
// Use Routes
// Anything that goes to '/api/item' must refer to the 'routes' variable
app.use("/api/items", routes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	// Load any other route except '/api/item'
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// We will use 'axios' to make the api call
// we include a "proxy" in the 'package.json' file in the client folder
// "proxy": "http://localhost:5000", so instead of using axious("http://localhost:5000/api/items")
// we use axious("/api/items")
