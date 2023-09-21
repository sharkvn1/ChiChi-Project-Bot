const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setNameLocalizations({
            vi: ' '
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
}