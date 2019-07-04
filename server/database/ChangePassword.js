var ConnectionDatabase = require('./ConnectionDatabase')
var Crypto = require('../function/Crypto')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    NewPassword: (Email, Pass, callback) => {
        ConnectionDatabase.connect().then((client) => {
            Crypto.Encrypt(Pass, (err, hash) => {
                client.db(dataBase).collection(col).updateOne({email: Email}, { $set: {password: hash} }, function(err, result) {
                    if (err){
                        callback(err, null)
                        throw err
                    }
                    callback(null, result)
                    client.close()
                })
            })
        })
    },
    ChangePassword: (Email, OldPass, NewPass, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).findOne({email: Email}, function(err, result) {
                if (err){
                    callback(err, null)
                    throw err
                }
                Crypto.CheckPassword(OldPass, result.password, (erro, res) => {
                    if(res){
                        Crypto.Encrypt(NewPass, (error, hash) => {
                            client.db(dataBase).collection(col).updateOne({email: Email}, { $set: {password: hash} }, function(errorr, Nresult) {
                                if (errorr){
                                    callback(errorr, null)
                                    throw errorr
                                }
                                callback(null, true)
                                client.close()
                            })
                        })
                    }
                })
            })
        })
    }
}