var express = require('express');
var path = require("path");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('policy.html', { root: path.join(__dirname, '../public') })
});

module.exports = router;