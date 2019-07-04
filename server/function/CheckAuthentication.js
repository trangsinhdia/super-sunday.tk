var jwt = require('jsonwebtoken');
var ConnectionDatabase = require('../database/ConnectionDatabase')

const dataBase = 'SuperSunday',
    col = 'User';

module.exports ={
    isAuthentication: (req, res, next) => {
        if(req.cookies.JWToken){
            jwt.verify(req.cookies.JWToken, 'foreveralone', function(err, payload){
                if(err){
                    res.status(401).json({message: 'Unauthorized user!'});
                }
                else {
                    ConnectionDatabase.connect().then((client) => {
                        client.db(dataBase).collection(col).findOne({
                            username: payload.username,
                        }, function(err, result) {
                            if (err){
                                res.status(401).json({ message: 'Unauthorized user!' })
                            }
                            else if(result){
                                let data = {
                                    state: 'Login Success',
                                    profile: {
                                        username: result.username,
                                        phone: result.phone,
                                        email: result.email,
                                        avatar: result.avatar,
                                        reference: result.reference
                                    }
                                }
                                res.json(data)
                            }
                            client.close()
                          })
                    })
                }
            })
        }
        else{
            res.send('Cookie is Expires')
        }
    }
}