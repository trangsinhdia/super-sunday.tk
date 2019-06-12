var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'Table'
module.exports = {
    getTable: (callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).find({}).toArray(function(err, result) {
                if (err) throw err;
                callback(result)
                client.close();
            });
        })
    }
}