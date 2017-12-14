let express = require('express');
const bcrypt = require('bcrypt');
let Sequelize = require('sequelize');

const sequelize = new Sequelize('coscashdb', 'root', 'ovodrake', {
    host: 'localhost',
    dialect: 'mysql'
});

let Transaction = sequelize.import('..\\models\\transaction.js');

let transactionsRouter = express.Router();

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
    /** Get all transactions */
    transactionsRouter.get('/', (req, res) => {
        Transaction.findAll().then((trans) => {
            return res.status(200).send(trans);
        }, (err) => {
            return res.status(400).send(err);
        });
    });

    /**Get transaction by ID */
    transactionsRouter.get('/:id([0-9]+)', (req, res) => {
        let transId = parseInt(req.params.id);
        Transaction.findOne({ where: { id: transId } }).then((trans) => {
            return res.status(200).send(trans);
        }, (err) => {
            return res.status(400).send(err);
        });
    });

    /** Create new transaction */
    transactionsRouter.post('/', (req, res) => {
        Transaction.create(req.body).then((trans) => {
            return res.status(200).send(trans);
        }, (err) => {
            return res.status(400).send(err);
        });
    });

    /** Update transaction */
    transactionsRouter.patch('/', (req, res) => {
        Transaction.update({ where: { id: req.body.id } }).then((trans) => {
            return res.status(200).send(trans);
        }, (err) => {
            return res.status(400).send(err);
        });
    });
});

module.exports = transactionsRouter;



