var router = require('express').Router()

router.get('/', function(req, res, next){
    if(req.cookies.JWToken){
        res.cookie('JWToken', req.cookies.JWToken, {expires: new Date(Date.now())})
        res.send('Logout')
    }
})

module.exports = router