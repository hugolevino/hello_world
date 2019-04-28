const express = require('express');
const rp = require('request-promise');

const app = express();

app.get('/', (req, res) => {

	var options = {
		method: 'GET',
		uri: 'https://b2w-region-v1.b2w.io/b2w-region/region?zipcode=13467500',
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
