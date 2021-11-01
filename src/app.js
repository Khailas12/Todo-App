const express = require('express');
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParser.json());     // sending json data from client side to server side.

const path = require('path');
const db = require('./db');
const collection = 'todo';
