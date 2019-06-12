var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'Replay'
module.exports = {
    getReplay: (callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).find({}).toArray(function(err, result) {
                if (err) throw err;
                callback(result)
                client.close();
            });
        })
    }
}