const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(cometta){
        console.log(`${cometta.user.tag} ready!`)
    }
}