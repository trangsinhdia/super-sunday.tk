var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    Register: (data, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).insertOne(data, function(err, res) {
                if (err){
                    callback('fail', null)
                    throw err
                }
                callback(null, 'Register Success')
                client.close()
              })
        })
    }
}