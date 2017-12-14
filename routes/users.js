let express = require('express');
const bcrypt = require('bcrypt');
let Sequelize = require('sequelize');

const sequelize = new Sequelize('coscashdb', 'root', 'ovodrake', {
    host: 'localhost',
    dialect: 'mysql'
});

let User = sequelize.import('..\\models\\user.js');

let Transaction = sequelize.import('..\\models\\transaction.js');

let usersRouter = express.Router();

let validateUser = function (req, res, next) {
    //req.checkBody('Email', 'Invalid description').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var response = { errors: [] };
        errors.forEach((err) => {
            response.errors.push(err.msg);
        });
        res.statusCode = 400;
        return res.json(response);
    }
    return next();
}


sequelize.sync().then(() => {
    /** Get all user accounts */
    usersRouter.get('/', (req, res) => {
        User.findAll().then((users) => {
            return res.status(200).send(users);
        }, (err) => {
            return res.status(203).send(err);
        });
    });

    /**Get user account by ID */
    usersRouter.get('/:id([0-9]+)', (req, res) => {
        let userId = parseInt(req.params.id);
        User.findOne({ where: { id: userId } }).then((user) => {
            return res.status(200).send(user);
        }, (err) => {
            return res.status(203).send(err);
        });
    });

    /** Create user account */
    usersRouter.post('/', (req, res) => {
        User.create(req.body).then((user) => {
            return res.status(200).send(user);
        }, (err) => {
            return res.status(203).send(err);
        });
    });

    /** Update user account */
    usersRouter.patch('/', (req, res) => {
        User.update({ where: { id: req.body.id } }).then((user) => {
            return res.status(200).send(user);
        }, (err) => {
            return res.status(203).send(err);
        });
    });


    /** Get users' transactions */
    usersRouter.get('/:id([0-9]+)/transactions', (req, res) => {
        let userId = parseInt(req.params.id);
        let response = [];
        Transaction.findAll({ where: { Sender: userId } }).then((trans) => {
            trans.forEach((t) => { response.push(t)});
            return Transaction.findAll({ where: { Recipient: userId}});
        }).then((trans2) => {
            trans2.forEach((t2) => { response.push(t2)});
            return res.status(200).send(response);
        }, (err) => {
            return res.status(203).send(err);
        });
    });
})

module.exports = usersRouter;