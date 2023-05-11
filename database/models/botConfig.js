const Sequelize = require('sequelize');
const sequelize = require('../Database');

const botConfig = sequelize.define('voiceChannelConfig', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    voiceChannelId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    mainChannelId: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = botConfig;