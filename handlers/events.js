const fs = require('fs');
const path = require('path');
const events = [];
let dateNow = Date.now();

module.exports = (chichi) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventsFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    console.log("[x] :: ".magenta + "Now starting loading events...".brightYellow);
    for (const file of eventsFile) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        events.push(event);
        if (event.once) {
            chichi.once(event.name, (...args) => event.execute(...args));
        } else {
            chichi.on(event.name, (...args) => event.execute(...args));
        }
    }
    console.log("[x] :: ".magenta + `Loaded ${events.length} events after: `.brightGreen + `${Date.now() - dateNow}ms`.green);
    console.log('\n');
}
