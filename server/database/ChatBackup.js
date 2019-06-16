var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'Chat'

module.exports = {
    MessageToDB: (data) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).insertOne(data, function(err, res) {
                if (err) throw err
                client.close();
            });
        })
    },
    MessageFromDB: (callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).find({}).toArray((err, result) => {
                if (err){
                    callback(err, null)
                    throw err;
                }
                callback(null, result)
                client.close();
            });
        })
    }
}