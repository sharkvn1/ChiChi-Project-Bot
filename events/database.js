const { Events, Client } = require('discord.js');
const guildConfig = require('../database/guildConfig')
module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {Client} cometta 
     */
    async execute(cometta) {
        const data = cometta.guilds.cache.toJSON();
        for (const i in data) {
            await guildConfig.findOne({
                guildId: data[i].id
            }).then(Data => {
                if (Data === null) {
                    new guildConfig({
                        guildId: data[i].id
                    }).save();
                }
            });
        }
    }
}