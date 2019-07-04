var router = require('express').Router()
var ChangePassword = require('../database/ChangePassword')

router.post('/', function(req, res, next){
    if(req.body.email && req.body.oldPass && req.body.newPass){
        ChangePassword.ChangePassword(req.body.email, req.body.oldPass, req.body.newPass, (err, resp) => {
            if(resp){
                res.send('Change password success')
            }
            else{
                res.send('Change password fail')
            }
        })
    }
})

module.exports = router