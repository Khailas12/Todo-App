const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const dbname = 'crud_mongodb';
const url = 'mongodb://localhost:27017';
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const state = { db : null };

const connect = (callback) => {
    if (state.db) {      // if db connection is active
        callback(); 
    } 
    else {  // connects to mongodb if no db connction
        MongoClient.connect(
            url, mongoOptions,
            (err, client) => {
                if (err) {
                    callback(err);
                }
                else {
                    state.db = client.db(dbname);
                    callback();
                }
            });
    }
}


const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDataBase = () => {
    return state.db;
}

module.exports = { getDataBase, connect, getPrimaryKey};