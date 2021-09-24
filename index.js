const express = require('express');
const got = require('got');
const app = express();
const port = process.env.PORT || 5001;
const production = process.env.PRODUCTION || false;
const api_key = process.env.API_KEY;
const web_app = process.env.WEBAPP;

app.get('/', (req, res) => {
	res.send('hello :)')
});

app.get('/get_hostname', (req, res) => {
	res.send(req.hostname)
});

app.get('/get_from_omdb', (req, res) => {
	(async () => {
		try {
			const response = await got(req.body.url + `&apikey=${api_key}`);
			res.send(response.body);
		} catch(error) {
			res.send(error.response.body);
		}
	})();
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
