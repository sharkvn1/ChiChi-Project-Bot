const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alabama')
    .setDescription('idk wtf is this'),
    async execute(interaction){
        await interaction.reply('pong');
    }
}