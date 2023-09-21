const { Interaction, EmbedBuilder, AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

/**
 * 
 * @param {Interaction} interaction
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('alabama')
        .setDescription('idk wtf is this'),
    async execute(interaction) {
        const canvas = createCanvas(1500, 280);
        const context = canvas.getContext('2d');

        //draw background
        const bg = await readFile('./img/snakeCaveWelcome.png');
        const bgi = new Image();
        bgi.src = bg;
        context.drawImage(bgi, 0, 0, canvas.width, canvas.height);

        //write new member name
        context.font = 'bold italic 40px Comic Sans MS';
        context.fillStyle = '#ffc530';
        const username = `${interaction.user.username}`;
        const usernameWidth = context.measureText(username).width;
        const usernameX = (1400 - 900 - usernameWidth) / 2 + 900;
        context.fillText(username, usernameX, 50);

        //write number of member
        context.font = 'bold italic 20px Comic Sans MS';
        context.fillStyle = '#ffc530';
        const countMemberText = `Number of member: ${interaction.guild.memberCount}`;
        const countMemberTextWidth = context.measureText(countMemberText).width
        const countMemberTextX = (1400 - 900 - countMemberTextWidth) / 2 + 900;
        context.fillText(countMemberText, countMemberTextX, 270);

        //draw circle for member avatar
        const circleX = (1400 - 1000 - 90) / 2 + 1000;
        context.beginPath();
        context.arc(circleX, 155, 90, 90, Math.PI * 2, true);
        context.closePath();
        context.clip();

        //draw member avatar
        const { body } = await request(interaction.user.displayAvatarURL({ extension: 'png' }));
        const avt = new Image();
        avt.src = Buffer.from(await body.arrayBuffer());
        const avaX = (1400 - 1000 - 290) / 2 + 1000;
        context.drawImage(avt, avaX, 55, 190, 190);
        context.lineWidth = 3;
        context.strokeStyle = 'yellow';
        context.stroke();

        const img = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'test.png' });

        // const welcomeMessage = new EmbedBuilder()
        //     .setTitle(`Welcome ${interaction.username} to our SnakeCave`)
        //     .setColor('#5e3fb4')
        //     .setDescription('Remember to read our rule')
        //     .setThumbnail(`https://cdn.discordapp.com/attachments/912573387560353836/1153917571075145789/F6KBYUKbsAA6-Uy-removebg-preview.png`)
        //     .setImage('attachment://test.png')
        //     .setTimestamp();
        await interaction.reply({ files: [img] }).catch(error => {
            console.log(error);
        })
    }
}