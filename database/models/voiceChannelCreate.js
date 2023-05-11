const Sequelize = require('sequelize');
const sequelize = require('../Database');

const voiceChannel = sequelize.define('voiceChannel', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    voiceChannelId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    voiceChannelOwner: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = voiceChannel;