let Sequelize = require('sequelize');

const sequelize = new Sequelize('coscashdb', 'root', 'ovodrake', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        Title: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        Email: { type: Sequelize.STRING, allowNull: false, unique: true },
        LastName: { type: Sequelize.STRING, allowNull: false },
        FirstName: { type: Sequelize.STRING, allowNull: false },
        Username: { type: Sequelize.STRING, allowNull: false, unique: true },
        Password: { type: Sequelize.STRING, allowNull: false },
        DOB: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        Street: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        HouseNr: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        Postcode: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        Country: { type: Sequelize.STRING, allowNull: true, defaultValue: "" },
        Language: { type: Sequelize.STRING, allowNull: true, defaultValue: "en" },
        Verified: { type: Sequelize.BOOLEAN, defaultValue: false },
        Confirmed: { type: Sequelize.BOOLEAN, defaultValue: false },
        Deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
    });
}