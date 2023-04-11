const express = require('express');
const cors = require('cors');

const {pipeline} = require('stream');
const serverless = require('serverless-http');

require('dotenv').config();

const port = process.env.PORT || 3001;
const production = (process.env.PRODUCTION === 'true');
const api_key = process.env.API_KEY;
const web_app = process.env.WEBAPP;
const omdb_api = "https://omdbapi.com";

const client_url = process.env.CLIENT_URL;

const app = express();
const got = require('got');
const router = express.Router();

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

router.get('/', (req, res) => {
	res.send('welcome to the random episode server :)')
});

router.get('/get_hostname', (req, res) => {
	res.send(req.hostname)
});

router.get('/get_from_omdb', (req, res) => {
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

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);