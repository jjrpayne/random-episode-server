const express = require('express');
const app = express();
const got = require('got');
const {pipeline} = require('stream');

require('dotenv').config()

const port = process.env.PORT || 3001;
const production = process.env.PRODUCTION || false;
const api_key = process.env.API_KEY;
const web_app = process.env.WEBAPP;
const omdb_api = "https://omdbapi.com";

app.get('/', (req, res) => {
	res.send('welcome to the random episode server :)')
});

app.get('/get_hostname', (req, res) => {
	res.send(req.hostname)
});

app.get('/get_from_omdb', (req, res) => {
	// console.log(production);
	if (production == true){
		if(req.hostname != web_app)
			return res.status(401).send("You are requesting this data from an unauthorized host.");
	}
	var params = req.query;
	params["apikey"] = api_key;
	// console.log(params);
	const dataStream = got.stream(omdb_api, {searchParams: params});
	pipeline(dataStream, res, (err) => {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
