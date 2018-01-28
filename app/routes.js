/**
 * API endpoints
 */

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded( {'extended': 'true'} ));
router.use(bodyParser.json());

router.get('/list', function(req, res) {
	
});

router.post('/create', function(req, res) {
	const data = req.body;
	getModel().create(data, function(err) {
		if (err) {
			res.json({ msg: 'error' });
			return;
		}
		res.json({ msg: 'success' });
	});
});

function getModel() {
	return require('./models/model.js');
}

module.exports = router;