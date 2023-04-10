const { REST, Routes } = require('discord.js');
const { token, comettaBotId } = require('../Config/config.json');
const fs = require('fs');
const path = require('path');
const cmds = [];
let dateNow = Date.now();

module.exports = (cometta) => {
    const cmdPath = path.join(__dirname, '../commands');
    const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));

    for (const file of cmdFiles) {
        const cmd = require(`../commands/${file}`);
        cmds.push(cmd.data.toJSON());
    }

    const rest = new REST().setToken(token);

    (async () => {
        try {
            console.log("[x] :: ".magenta + 'Now start depoly slash commands...'.brightYellow)
            const data = await rest.put(
                Routes.applicationCommands(comettaBotId),
                { body: cmds },
            );
            console.log("[x] :: ".magenta + `Successfully deploy ${cmds.length} slash commands after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
        } catch (error) {
            console.error(error);
        }
    })();
}