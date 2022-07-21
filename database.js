const Sequelize = require('sequelize');

// Connect to database
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: './data/database.sqlite',
});

module.exports = {
    // Elements in database
    Scoreboard: sequelize.define('score', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        top1: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        top2: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        top3: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        total: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    })
}