var express = require('express');
var router = express.Router();
var GetReplay = require('../database/GetReplay')

GetReplay.getReplay((dataset) => {
  router.get('/', function(req, res, next) {
    res.send(dataset)
  });
})

module.exports = router;