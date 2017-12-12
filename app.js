const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const bcrypt = require('bcrypt');

let usersRouter = require('./routes/users.js');
let transactionsRouter = require('./routes/transactions.js');

const app = express();
app.use(logger('dev'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);

app.get('/auth', (req, res) => {
 
});

app.get('*', (req, res) => {
    res.status(404).send({message: 'Welcome to the beginning of nothingness.'});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});