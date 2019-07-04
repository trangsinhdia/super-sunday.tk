var bcrypt = require('bcryptjs');

module.exports = {
    Encrypt: (password, callback) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                callback(err, hash)
            });
        });
    },
    CheckPassword: (password, hash, callback) => {
        bcrypt.compare(password, hash, function(err, res) {
            callback(err, res)
        });
    }
}