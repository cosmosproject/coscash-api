let Sequelize = require('sequelize');

const sequelize = new Sequelize('coscashdb', 'root', 'ovodrake', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Transaction', {
        Title: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        Amount: { type: Sequelize.INTEGER, allowNull: true },
        Sender: { type: Sequelize.INTEGER, allowNull: true },
        Recipient: { type: Sequelize.STRING, allowNull: true }
    });
}