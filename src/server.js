/**
 * Server
 */

const express  = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

var app = express();
app.use(express.static(__dirname + '/public'));
app.use('/api', require('./app/routes.js'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
	console.log('App listening on port ' + port);
});