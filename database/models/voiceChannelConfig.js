const Sequelize = require('sequelize');
const sequelize = require('../Database');

const voiceChannelConfig = sequelize.define('voiceChannelConfig', {
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
        allowNull: false,
    }
})

module.exports = voiceChannelConfig;