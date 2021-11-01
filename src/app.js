const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const path = require('path');
const db = require('./db');

const collection = 'todo';

// app.use(bodyParser.json());     // sending json data from client side to server side.


db.connect((error) => {
    if (error) {
        console.log('Unable to connect to database');
        process.exit(1);  // terminates the app 
    }

    // if able to connect to the db
    else {
        app.listen(3000, () => {
            console.log('connected to db on port 3000');
        });
    }
});