const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const production = process.env.PRODUCTION || false;
const api_key = process.env.API_KEY || null;

app.get('/', (req, res) => {
  res.send('hello :)')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
