var MongoClient = require('mongodb').MongoClient;
var connectionString = 'mongodb://localhost:27017/SuperSunday';

module.exports = {
    create : () => {
        return new Promise((res, rej) => {
            MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
                if (err) rej(err)
                console.log("Database created!");
                res(client)
            })
        })
    },
    connect: () => {
        return new Promise((res, rej) => {
            MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
                if (err) rej(err)
                res(client)
            })
        })
    }
}