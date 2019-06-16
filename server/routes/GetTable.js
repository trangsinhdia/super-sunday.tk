var express = require('express');
var router = express.Router();
var GetTable = require('../database/GetTable')

router.get('/:league', function(req, res, next) {
    GetTable.getTable(req.params.league, (err, result) => {
        if(result){
            res.send(result)
        }
        else{
            res.send(err)
        }
    })
});

module.exports = router;