let db = null;
let client = null;

const MongoClient = require('mongodb').MongoClient;
//import { MongoClient } from 'mongodb';

const getDb = async() => {
    if (db) {
        return db;
    }
    if (!client) {

        client = await MongoClient.connect(process.env.MONGOURI, {
            UseNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    db = client.db();
    return db;
}

module.exports = getDb;