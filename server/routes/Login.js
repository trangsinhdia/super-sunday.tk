var router = require('express').Router()
var login = require('../database/Login')
var jwt = require('jsonwebtoken')

const jwtSecretKey = 'foreveralone'

router.post('/', function(req, res, next){
    if(req.body.email && req.body.password){
        login.Login(req.body.email, req.body.password, (err, result) => {
            if(result){
                var jwtToken = jwt.sign({username: result.username}, jwtSecretKey, { expiresIn: '1d' });
                res.cookie('JWToken', jwtToken, { httpOnly:true})
                let data = {
                    state: 'Login Success',
                    profile: {
                        username: result.username,
                        phone: result.phone,
                        birthday: result.birthday,
                        avatar: result.avatar,
                        reference: result.reference
                    }
                }
                res.send(data)
                res.end()
            }
            else if(err){
                res.send(err)
            }
            else{
                res.send('Not found account')
            }
        })
    }
    else{
        res.send('Please using x-www-form-urlencoded or check username and password!')
    }
})

module.exports = router;