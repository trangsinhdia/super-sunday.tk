var express = require('express');
var router = express.Router();
var Register = require('../database/Register')

router.post('/', (req, res, next) => {
    if(req.body.username && req.body.password){
        Register.Register(req.body.username, req.body.password, (err, state) => {
            if(state){
                res.send(state)
            }
            else{
                res.send(err)
            }
        })
    }
    else{
        res.send('Please using x-www-form-urlencoded or check username and password!')
    }
})

module.exports = router;