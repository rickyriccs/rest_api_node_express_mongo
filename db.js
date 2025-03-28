const {MongoClient} = require('mongodb');
let dbConnection;
let uri = "mongodb://0.0.0.0:27017/dbNxtWave";


module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch((err) => {
            console.error(err);
            return callback();
        })
    },
    getDb: () => dbConnection
}