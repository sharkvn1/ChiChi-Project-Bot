const { Client, Events, ChannelType, channelLink } = require('discord.js');
const guildConfig = require('../database/guildConfig');
const tempVC = require('../database/tempVC')

module.exports = {
    name: Events.VoiceStateUpdate,
    /**
     * 
     * @param {Client} cometta 
     */
    async execute(oS, nS) {
        const { member, guild } = oS;
        const vcConfig = await guildConfig.findOne({ guildId: nS.guild.id })
        const vcData = await tempVC.findOne({ guildId: oS.guild.id })

        for (const i in vcConfig.voiceChannelId) {
            if (vcConfig.voiceChannelId[i] == nS.channelId) {
                await guild.channels.create({
                    name: `${member.user.username}`,
                    type: ChannelType.GuildVoice,
                    parent: nS.channel.parent,
                }).then(async Channel => {
                    await member.voice.setChannel(Channel);
                    await tempVC.create({
                        guildId: oS.guild.id,
                        channelId: Channel.id,
                        owner: oS.id
                    })
                })
            }
        }
        if (vcData === null) return;

        if (oS.channelId !== null && vcData.channelId == oS.channelId) {
            if (oS.channel.members.filter(x => !x.user.bot).size == 0) {
                let channel = oS.guild.channels.cache.get(oS.channelId);
                await channel.delete();
                await tempVC.deleteOne({ channelId: channel.id })
            }
        }
    }
}