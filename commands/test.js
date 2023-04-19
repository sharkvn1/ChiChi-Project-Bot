const { Interaction, AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;
    do {
        context.font = `${fontSize -= 10}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);
    return context.font;
};
/**
 * 
 * @param {Interaction} interaction 
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('alabama')
        .setDescription('idk wtf is this'),
    async execute(interaction) {
        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const bg = await readFile('./img/comettaRule.jpg')
        const bgi = new Image();
        bgi.src = bg;
        context.drawImage(bgi, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);
        context.font = applyText(canvas, `${interaction.user.displayName}!`);
        context.fillStyle = '#ffffff';
        context.fillText(`${interaction.user.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
        const avt = new Image();
        avt.src = Buffer.from(await body.arrayBuffer());
        context.drawImage(avt, 25, 25, 200, 200);

        const img = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'test.png' });

        // const welcomeMessage = new EmbedBuilder()
        //     .setTitle(`Welcome ${cometta.user.username} to our Cometta Space Station`)
        //     .setColor('#5e3fb4')
        //     .setDescription('Remember to read our rule and answer the question in the server guide')
        //     .setThumbnail(`https://cdn.discordapp.com/attachments/912573387560353836/1098189469410144376/Cometta-Logo-yChV3SYPL-transformed.png`)
        //     .setImage('attachment://test.png')
        //     .setTimestamp();

        interaction.reply({ files: [img] });
    }
}