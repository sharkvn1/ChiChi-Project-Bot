const fs = require('fs');
const path = require('path');


module.exports = (cometta) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventsFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventsFile) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            cometta.once(event.name, (...args) => event.execute(...args));
        } else {
            cometta.on(event.name, (...args) => event.execute(...args));
        }
    }
}
