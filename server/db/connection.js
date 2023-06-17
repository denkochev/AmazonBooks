require("dotenv").config();
const { MongoClient } = require('mongodb');
// SET YOUR LOCAL URL
const connectionString = process.env.connectionString;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db('bookStore');
            console.log('Successfully connected to MongoDB.');

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};