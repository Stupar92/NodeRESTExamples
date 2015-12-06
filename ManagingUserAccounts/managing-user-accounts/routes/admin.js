var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Welcome to admin');
});

module.exports = router;
