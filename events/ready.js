const { Events } = require('discord.js');
let dateNow = Date.now();
const voiceChannel = require("../database/models/voiceChannelCreate");
const botConfig = require("../database/models/botConfig");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(cometta){
        //logging meessage
        try {
            const stringlength2 = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.yellow);
            console.log(`     ┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow)
            console.log(`     ┃ `.bold.yellow + `Logging into the BOT...`.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Logging into the BOT...`.length) + "┃".bold.yellow)
            console.log(`     ┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.yellow)
        } catch (err) { console.log(err) }
        try {
            const stringlength2 = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green);
            console.log(`     ┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green)
            console.log(`     ┃ `.bold.green + `Successfully logging to ${cometta.user.tag}`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Successfully logging to ${cometta.user.tag}`.length) + "┃".bold.green)
            console.log(`     ┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green)
        } catch (err) { console.log(err) }

        try {
            const stringlength2 = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue);
            console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
            console.log(`     ┃ `.bold.blue + `${cometta.user.tag} Successfully Starting`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `${cometta.user.tag} Successfully Starting`.length) + "┃".bold.blue)
            console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
        } catch (err) { console.log(err) }

        //database loading
        console.log("\n[x] :: ".magenta + `Now starting loading database...`.brightYellow);
        voiceChannel.sync({force: true});
        botConfig.sync({force: false});
        console.log("[x] :: ".magenta + `Loaded database after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
    }
}