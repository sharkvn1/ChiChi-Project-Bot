import { Client, GatewayIntentBits, Collection } from 'discord.js';
import config from './Config/config.json';
import colors from 'colors';

const chichi = new Client({
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
  console.log("\n");
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue);
  console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue);
  console.log(`     ┃ `.bold.blue + `Now Start Running Bot`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Now Start Running Bot`.length) + "┃".bold.blue);
  console.log(`     ┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue);
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue);
  console.log(`\n`);
} catch (err) {
  console.log(err);
}

chichi.commands = new Collection();

async function requirehandlers() {
  for await (const handler of [
    "events",
    "commands",
    "AntiCrash",
    "DeployCmd"
  ]) {
    try {
      await require(`./handlers/${handler}`)(chichi);
    } catch (e) {
      console.log(e);
    }
  }
}

requirehandlers();

chichi.login(config.token);