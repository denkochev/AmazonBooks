const { MongoClient } = require('mongodb');
const connectionString = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1";
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