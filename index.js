const {Client, Events, GatewayIntentBits } = require('discord.js');
const config = require('./Config/config.json');

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

async function requirehandlers(){
    for await (const hander of [
      "events",
      "commands"
    ]) {
      try{
        await require(`./handlers/${hander}`)(cometta);
      }catch(e){console.log(e)}
    }
  }
  requirehandlers()

cometta.login(config.token);