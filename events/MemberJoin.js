
const { Events, EmbedBuilder, Client, AttachmentBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;
    do {
        context.font = `${fontSize -= 10}px tahoma bold italic`;
    } while (context.measureText(text).width > canvas.width - 300);
    return context.font;
};

module.exports = {
    name: Events.GuildMemberAdd,

    /**
     * 
     * @param {Client} cometta
     */
    async execute(cometta) {
        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const bg = await readFile('./img/welcome.jpg');
        const bgi = new Image();
        bgi.src = bg;
        context.drawImage(bgi, 0, 0, canvas.width, canvas.height);

        context.font = applyText(canvas, `${cometta.user.username}!`);
        context.fillStyle = '#ffffff';
        context.strokeStyle = '#5e3fb4';
        context.strokeText(`${cometta.user.username}!`, canvas.width / 2.5, canvas.height / 3.5);
        context.fillText(`${cometta.user.username}!`, canvas.width / 2.5, canvas.height / 3.5);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const { body } = await request(cometta.user.displayAvatarURL({ extension: 'jpg' }));
        const avt = new Image();
        avt.src = Buffer.from(await body.arrayBuffer());
        context.drawImage(avt, 25, 25, 200, 200);

        const img = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'test.png' });

        const welcomeMessage = new EmbedBuilder()
            .setTitle(`Welcome ${cometta.user.username} to our Cometta Space Station`)
            .setColor('#5e3fb4')
            .setDescription('Remember to read our rule and answer the question in the server guide')
            .setThumbnail(`https://cdn.discordapp.com/attachments/912573387560353836/1098189469410144376/Cometta-Logo-yChV3SYPL-transformed.png`)
            .setImage('attachment://test.png')
            .setTimestamp();

            cometta.user.send({ embeds: [welcomeMessage], files: [img]});
    }
}