const { Collection, REST, Routes } = require('discord.js');
const config = require('../Config/config.json');
const fs = require('fs');
const path = require('path');
const cmds = [];

module.exports = (cometta) => {
    cometta.commands = new Collection;

    const cmdPath = path.join(__dirname, '../commands');
    const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
    for (const file of cmdFiles){
        const filePath = path.join(cmdPath, file);
        const cmd = require(filePath);
        cmds.push(cmd.data.toJSON());
        if('data' in cmd && 'execute' in cmd){
            cometta.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`[Warning] the cmd at ${filePath} is missing a required "data" or "execute" property`);
        }
    }

    const rest = new REST().setToken(config.token);

    (async () => {
        try {
            const data = await rest.put(
                Routes.applicationGuildCommands(config['cometta-Bot-Id'], config['cometta-Server-id']),
                {body: cmds},  
            );
        } catch (error) {
            console.log(error);
        }
    })
}