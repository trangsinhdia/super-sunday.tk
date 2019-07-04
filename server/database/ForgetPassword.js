var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    FindEmailFromDB: (emai, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).findOne({
                email: emai
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