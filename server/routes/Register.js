var express = require('express');
var router = express.Router();
var Register = require('../database/Register')

router.post('/', (req, res, next) => {
    if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
        res.send('Please using x-www-form-urlencoded or check username and password!')
    }
    else{
        Register.Register(req.body, (err, state) => {
            if(state){
                res.send(state)
            }
            else{
                res.send(err)
            }
        })
    }
})

module.exports = router;