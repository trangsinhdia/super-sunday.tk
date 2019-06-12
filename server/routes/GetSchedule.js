var express = require('express');
var router = express.Router();
var GetSchedule = require('../database/GetSchedule')

router.get('/:date', function(req, res, next) {
    console.log(req.params.date)
    GetSchedule.Schedule(req.params.date, (err, result) => {
        if(result){
            res.send(result)
        }
        else{
            res.send(err)
        }
    })
});

module.exports = router;