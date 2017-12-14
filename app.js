const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const bcrypt = require('bcrypt');
let Sequelize = require('sequelize');

const sequelize = new Sequelize('coscashdb', 'root', 'ovodrake', {
    host: 'localhost',
    dialect: 'mysql'
});

let User = sequelize.import('.\\models\\user.js');

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

app.post('/auth', (req, res) => {
    User.find({where: { Username: req.body.Username, Password: req.body.Password}}).then((user) => {
     if(user && user.id) {
       return res.status(200).send(user);
     };
     return res.status(202).send(user);
    }, (err) => {
        return res.status(400).send(err);
    });
});

app.get('*', (req, res) => {
    res.status(404).send({message: 'Welcome to the beginning of nothingness.'});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});