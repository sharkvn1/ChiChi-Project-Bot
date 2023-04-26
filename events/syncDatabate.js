const voiceChannel = require("../database/models/voiceChannelCreate");
const voiceChannelConfig = require("../database/models/voiceChannelConfig");

let dateNow = Date.now();
const {Events} = require("discord.js");
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(cometta){
        console.log("\n[x] :: ".magenta + `Now starting loading database...`.brightYellow);
        voiceChannel.sync({force: true});
        voiceChannelConfig.sync({force: false});
        console.log("[x] :: ".magenta + `Loaded database after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
    }
}