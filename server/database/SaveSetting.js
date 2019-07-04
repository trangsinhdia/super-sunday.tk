var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'User'
module.exports = {
    SaveSetting: (Email, setting, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).updateOne({email: Email}, { $set: {reference: setting} }, function(err, result) {
                if (err){
                    callback(err, null)
                    throw err
                }
                callback(null, result)
                client.close()
            })
        })
    },
    EditProfile: (profile, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).updateOne({username: profile.username}, { $set: {phone: profile.phone, email: profile.email} }, function(err, result) {
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