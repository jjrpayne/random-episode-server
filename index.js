const express = require('express');
const cors = require('cors');
const app = express();
const got = require('got');
const {pipeline} = require('stream');

require('dotenv').config();

const port = process.env.PORT || 3001;
const production = (process.env.PRODUCTION === 'true');
const api_key = process.env.API_KEY;
const web_app = process.env.WEBAPP;
const omdb_api = "https://omdbapi.com";

const client_url = process.env.CLIENT_URL;

var corsOptions = [
	{
		"origin": "*",
		"optionsSuccessStatus": 200
	},
	{
		"origin": client_url,
		"optionssSuccessStatus": 200
	}
];

var option = 0;
if (production == true){
	option = 1;
}

app.get('/', (req, res) => {
	res.send('welcome to the random episode server :)')
});

app.get('/get_hostname', (req, res) => {
	res.send(req.hostname)
});

app.get('/get_from_omdb', cors(corsOptions[option]), (req, res) => {
//	console.log('Production mode = ', production);
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
	
	console.log(production);
	console.log(typeof(production));
	console.log(option);
	console.log(cors(corsOptions[option]));
	console.log(corsOptions[option]);

	console.log(`Listening on port ${port}`);
})
