var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//arrays to hold reservations and waitlist
var reservations = [];

var waitlist = [];

//routes for HTML pages
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

//routes for api calls
app.get("/api/tables", function(req, res) {
	return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
	return res.json(waitlist);
});

//adding new reservation to array and text file
app.post("/api/new", function(req, res) {
	var newreservation = req.body;
	newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase;

	console.log(newreservation);

	// fs.appendFile("data.txt", JSON.toString(newreservation), function(err) {
	// 	if (err) throw err;
	// });

	res.json(newreservation);

	if (reservations.length <= 5) {
		reservations.push(newreservation);
		alert("You have made a reservation!");
	} else {
		waitlist.push(newreservation);
		alert("All our tables are booked. You were added to the waitlist.");
	}
	
});

//==========================================================
//listener

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});