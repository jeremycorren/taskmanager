/**
 * API endpoints
 */

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded( {'extended': 'true'} ));
router.use(bodyParser.json());
router.use(function(req, res, next) {
  res.set('Content-Type', 'application/json');
  next();
});

router.get('/list', function(req, res) {
	getModel().list(function(err, entities) {
		if (err) {
			next(err);
			return;
		}
		res.json({ tasks: entities });
	});
});

router.post('/create', function(req, res) {
	const data = req.body;
	getModel().create(data, function(err) {
		if (err) {
			next(err);
			return;
		}
		res.json({ msg: 'success' });
	});
});

function getModel() {
	return require('./models/model.js');
}

module.exports = router;