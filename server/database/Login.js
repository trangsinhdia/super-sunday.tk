var ConnectionDatabase = require('./ConnectionDatabase')
var Crypto = require('../function/Crypto')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    Login: (email, pass, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).findOne({
                email: email
            }, function(err, result) {
                if (err){
                    callback(err, null)
                    throw err
                }
                if(result){
                    Crypto.CheckPassword(pass, result.password, (err, res) => {
                        if(res){
                            callback(null, result)
                            client.close()
                        }
                        else{
                            callback(null, false)
                        }
                    })
                }
                else{
                    callback(null, false)
                }
            })
        })
    }
}