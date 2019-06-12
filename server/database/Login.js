var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    Login: (user, pass, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).findOne({
                username: user,
                password: pass
            }, function(err, result) {
                if (err){
                    callback(err, null)
                    throw err
                }
                callback(null, result)
                client.close()
              })
        })
    }
}