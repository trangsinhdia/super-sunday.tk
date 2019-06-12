var express = require('express');
var router = express.Router();
var GetTable = require('../database/GetTable')

GetTable.getTable((dataset) => {
  router.get('/', function(req, res, next) {
    res.send(dataset)
  });
})

module.exports = router;