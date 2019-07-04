var router = require('express').Router()
var ForgetPassword = require('../database/ForgetPassword')
var ChangePassword = require('../database/ChangePassword')
var Mail = require('../function/NodeMailler')
var vCode

router.post('/', function(req, res, next){
    if(req.body.email && !req.body.code && !req.body.password){
        ForgetPassword.FindEmailFromDB(req.body.email, (err, result) => {
            if(result){
                vCode = Math.floor(1000 + Math.random() * 9000);
                Mail.exec({
                    from: 'tutc.97@gmail.com',
                    to: req.body.email,
                    subject: 'Verification Code',
                    text: ' Your Verification Code is ' + vCode
                  })
                res.send('Code sent OK')
            }
            else{
                res.send('Invaild email')
            }
        })
    }
    else if(req.body.code && !req.body.password && !req.body.email){
        if(req.body.code === vCode){
            res.send('Verified')
        }
        else{
            res.send('Code invaild')
        }
    }
    else if(req.body.code && req.body.password && req.body.email){
        if(req.body.code === vCode){
            ChangePassword.NewPassword(req.body.email, req.body.password, (err, result) => {
                if(result){
                    res.send('Change password success')
                }
                else{
                    res.send('Change password fail')
                }
            })
        }
        else{
            res.send('Code invaild')
        }
    }
})

module.exports = router