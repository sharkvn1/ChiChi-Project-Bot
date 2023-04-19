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
        
    }
}