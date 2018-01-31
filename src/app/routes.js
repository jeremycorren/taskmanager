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

router.get('/list', function(req, res, next) {
	getModel().list(function(err, entities) {
		if (err) {
			next(err);
			return;
		}
		res.json({ tasks: entities });
	});
});

router.post('/create', function(req, res, next) {
	const task = req.body;
	getModel().create(task, function(err) {
		if (err) {
			next(err);
			return;
		}
		res.json({ msg: 'Create successful!' });
	});
});

router.post('/update', function(req, res, next) {
	const {id, task} = req.body;
	getModel().update(id, task, function(err) {
		if (err) {
			next(err);
			return;
		}
		res.json({ msg: 'Update successful!' });
	});
});

router.post('/delete', function(req, res, next) {
	const id = req.body;
	getModel().delete(id, function(err) {
		if (err) {
			next(err);
			return;
		}
		res.json({ msg: 'Delete successful!' });
	});
});

function getModel() {
	return require('./models/model.js');
}

module.exports = router;