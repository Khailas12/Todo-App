const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./db');

const collection = 'todo';

// app.use(bodyParser.json());     // sending json data from client side to server side.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/gettodo', (req, res) => {
    db.getDataBase().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(documents);
            res.json(documents);
        }
    });
});


app.put('/:id', (req, res) => {
    const todoID = req.params.id;
    console.log(todoID);
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate(
        {_id: db.getPrimaryKey(todoID)}, {$set: {todo: userInput.todo}}, 
        {returnOriginal: false},
    (err, result) => {
        if (err) {
            console.error('Error');
        }
        else { // sends data back if exists
            res.json(result);
        }
    });
})



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