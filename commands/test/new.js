const { SlashCommandBuilder } = require('discord.js')
const guildConfig = require('../../database/guildConfig');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testing')
        .setDescription('test cmd'),
    async execute(interaction) {
        const data = await guildConfig.findOne({ guildId: interaction.guildId });
        console.log(interaction.client.user.displayAvatarURL())
    }
}