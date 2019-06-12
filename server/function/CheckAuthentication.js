var jwt = require('jsonwebtoken');
var ConnectionDatabase = require('../database/ConnectionDatabase')

const dataBase = 'SuperSunday',
    col = 'User';

module.exports ={
    isAuthentication: (req, res, next) => {
        let jwtToken = null
        const match = new RegExp('JWToken=(.*);').exec(req.headers.cookie)
        if(match){
            jwtToken = match[1]
        }
        if(req.headers.cookie && jwtToken){
            jwt.verify(jwtToken, 'foreveralone', function(err, payload){
                if(err){
                    res.status(401).json({message: 'Unauthorized user!'});
                }
                else {
                    console.log('decoder: ' + payload.username);
                    // find
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
                                        birthday: result.birthday,
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