// const client = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const config = require('config');
const { db } = require('../endpoints/publicUser/publicUserModel');
const User = require('../endpoints/user/UserModel');

let _db;

const connectionString = config.get('db.connectionString');

function initDb(callback) {
    if (_db) {
        if(callback){
            return callback(null, _db);
        } 
        else{
            return _db;
        }
    }
    else{
        mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology : true});
        _db = mongoose.connection;
        _db.on('error', console.error.bind(console, 'connection in db.js error:'));
        _db.once('open', function(){
            //wenn datenbankanbindung funktioniert hat:
            //console.log("Connected to Database :)" + connectionString + "in DB.js " + _db);
            callback(null, db);
        });

    }
}

module.exports = {
    initDb
};