//2019-05-12T07:00Z
var ConnectionDatabase = require('./ConnectionDatabase')
const dataBase = 'SuperSunday'
const col = 'Schedule'

module.exports = {
    Schedule: (day, callback) => {
        ConnectionDatabase.connect().then((client) => {
            client.db(dataBase).collection(col).find({date: day}).toArray((err, result) => {
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