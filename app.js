const express = require('express');
const rp = require('request-promise');

const app = express();

app.get('/frete', (req, res) => {

	var cep = req.query.cep;

	var options = {
		method: 'GET',
		uri: 'https://b2w-region-v1.b2w.io/b2w-region/region?zipcode=' + cep,
		resolveWithFullResponse: true,
		headers: {
			"content-type": "application/json",
			"accept": "application/json"
		},
		json: true
	};
	 
	rp(options).then(function (repos) {
		 res.status(200);
	     res.send(repos.body);
	     res.end();
	})
	.catch(function (response) {
		res.status(400);
	    res.send('DEU XABU');
	    res.end();
	});

});

app.get('/teste', (req, res) => {

	 res.status(200);
	 res.send('SPEED TEST');
	 res.end();

});

app.post('/listening', (req, res) => {
  console.log(req.body);
  console.log('Received task with payload: %s', req.body);
  res.send(`Printed task payload: ${req.body}`).end();
  
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
