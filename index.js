const {Client, GatewayIntentBits, Collection} = require('discord.js');
const config = require('./Config/config.json');
const colors = require("colors");

const cometta = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

try {
  const stringlength2 = 69;
  console.log("\n")
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue);
  console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
  console.log(`     ┃ `.bold.blue + `Now Start Running Bot`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Now Start Running Bot`.length) + "┃".bold.blue)
  console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
  console.log(`\n`);
} catch (err) { console.log(err) }

cometta.commands = new Collection;

async function requirehandlers(){
    for await (const hander of[
      "events",
      "commands",
      "AntiCrash",
      "DeployCmd"
    ]) {
      try{
        await require(`./handlers/${hander}`)(cometta);
      }catch(e){console.log(e)}
    }
  }
  requirehandlers();

cometta.login(config.token);