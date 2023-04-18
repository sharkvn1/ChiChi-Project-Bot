const {Events, EmbedBuilder } = require('discord.js');
module.exports = {
    name: Events.GuildMemberAdd,

    /**
     * 
     * @param {interaction} interaction 
     */
    async execute(cometta){
        const welcomeMessage = new EmbedBuilder()
        .setTitle(`Welcome ${cometta.user.username} to out cometta discord server`)
        .setDescription('Remember to read our rule and answer the question in the server guide');

        cometta.user.send({ embeds: [welcomeMessage]});
        
    }
}