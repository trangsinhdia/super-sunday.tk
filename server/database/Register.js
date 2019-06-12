var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'User'

module.exports = {
    Register: (user, pass, callback) => {

        var data = {
            username : user,
            password : pass,
            phone : '',
            birthday : '',
            avatar : '',
            reference : null
        }

        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).insertOne(data, function(err, res) {
                if (err){
                    callback('fail', null)
                    throw err
                }
                callback(null, 'success')
                client.close()
              })
        })
    }
}