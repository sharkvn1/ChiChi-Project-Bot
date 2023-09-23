import { Interaction, EmbedBuilder, AttachmentBuilder, SlashCommandBuilder, Message } from 'discord.js';
import { createCanvas, Image } from '@napi-rs/canvas';
import { readFile } from 'fs/promises';
import { request } from 'undici';

/**
 * 
 * @param {Interaction} interaction
 */
export const data = new SlashCommandBuilder()
    .setName('alabama')
    .setDescription('idk wtf is this');
export async function execute(interaction) {
    const canvas = createCanvas(2000, 319);
    const context = canvas.getContext('2d');

    //draw background
    const bg = await readFile('./img/snakeCaveWelcome.png');
    const bgi = new Image();
    bgi.src = bg;
    context.drawImage(bgi, 0, 0, canvas.width, canvas.height);

    //write profile text
    context.font = 'bold italic 40px Comic Sans MS';
    context.fillStyle = '#ffc530';
    context.fillText(`Profile`, 1380, 50);

    //write new member name
    // context.font = 'bold italic 40px Comic Sans MS';
    // context.fillStyle = '#ffc530';
    // const username = `${interaction.user.username}`;
    // const usernameWidth = context.measureText(username).width;
    // const usernameX = (1700 - 1200 - usernameWidth) / 2 + 1200;
    // context.fillText(username, usernameX, 50);
    //write number of member
    // context.font = 'bold italic 20px Comic Sans MS';
    // context.fillStyle = '#ffc530';
    // const countMemberText = `Number of member: ${interaction.guild.memberCount}`;
    // const countMemberTextWidth = context.measureText(countMemberText).width
    // const countMemberTextX = (1900 - 1400 - countMemberTextWidth) / 2 + 1400;
    // context.fillText(countMemberText, countMemberTextX, 270);
    //draw circle for member avatar
    context.beginPath();
    context.arc(1350, 155, 110, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();


    //draw member avatar
    const { body } = await request(interaction.user.displayAvatarURL({ extension: 'png' }));
    const avt = new Image();
    avt.src = Buffer.from(await body.arrayBuffer());
    context.drawImage(avt, 1250, 55, 200, 200);
    context.lineWidth = 20;
    context.strokeStyle = '#ffc630';
    context.stroke();

    const img = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'test.png' });
    await interaction.reply({ files: [img] }).catch(error => {
        console.log(error);
    });
}