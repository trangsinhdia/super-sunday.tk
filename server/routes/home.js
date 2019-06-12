var express = require('express');
var router = express.Router();
var checkAuthentication = require('../function/CheckAuthentication')

/* GET home page. */
router.get('/', checkAuthentication.isAuthentication);

module.exports = router;