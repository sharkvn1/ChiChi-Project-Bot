const fs = require('fs');
const path = require('path');
const cmds = [];
let dateNow = Date.now();

module.exports = (cometta) => {
    console.log("[x] :: ".magenta + `Now starting loading commands...`.brightYellow);
    const foldersPath = path.join(__dirname, '../commands');
    const cmdsFolder = fs.readdirSync(foldersPath);
    for (const folder of cmdsFolder) {
        const cmdPath = path.join(foldersPath, folder);
        const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
        for (const file of cmdFiles) {
            const filePath = path.join(cmdPath, file);
            const cmd = require(filePath);
            cmds.push(cmd.data.name);
            if ('data' in cmd && 'execute' in cmd) {
                cometta.commands.set(cmd.data.name, cmd);
            } else {
                console.log(`[Warning] the cmd at ${filePath} is missing a required "data" or "execute" property`.brightRed);
            }
        }
    }
    console.log("[x] :: ".magenta + `Loaded ${cmds.length} commands after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
    console.log('\n');
}