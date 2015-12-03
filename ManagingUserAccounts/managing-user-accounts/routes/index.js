var express = require('express');
var router = express.Router();

/**
 * Mongoose ready state:
 * 0 - disconnected
 * 1 - connected
 * 2 - connecting
 * 3 - disconnecting
 * 
 * get it with: `mongoose.connection.readyState`.
 */
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res) {
    console.log(mongoose.connection.readyState);
    res.render('index', { title: 'Express' });
});

module.exports = router;