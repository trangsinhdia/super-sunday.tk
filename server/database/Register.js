var ConnectionDatabase = require('./ConnectionDatabase')
var Crypto = require('../function/Crypto')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    Register: (data, callback) => {
        ConnectionDatabase.connect().then((client) => {
            Crypto.Encrypt(data.password, (err, hash) => {
                client.db(dataBase).collection(col).insertOne({
                    username: data.username,
                    password: hash,
                    email: data.email,
                    phone: '',
                    avatar: '',
                    reference: '',
                }, function(err, res) {
                    if (err){
                        callback('fail', null)
                        throw err
                    }
                    callback(null, 'Register Success')
                    client.close()
                })
            })
        })
    }
}