const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./db');

const collection = 'todo';

// app.use(bodyParser.json());     // sending json data from client side to server side.

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/gettodo', (request, response) => {
    db.getDataBase().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(documents);
            response.json(documents);
        }
    });
});


db.connect((err) => {
    if (err) {
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