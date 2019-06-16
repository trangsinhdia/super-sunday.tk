var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'Table'

module.exports = {
    getTable: (leagu, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).find({league: leagu}).toArray((err, result) => {
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