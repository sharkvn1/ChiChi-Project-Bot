const { Client, Events, ChannelType, channelLink } = require('discord.js');
const voiceChannelConfig = require('../database/models/voiceChannelConfig')
const voiceChannel = require('../database/models/voiceChannelCreate')

module.exports = {
    name: Events.VoiceStateUpdate,
    /**
     * 
     * @param {Client} cometta 
     */
    async execute(oS, nS) {

        const { member, guild } = oS;
        const CGdata = await voiceChannelConfig.findOne({
            where: { guildId: nS.guild.id },
        })
        const VCdata = await voiceChannel.findOne({
            where: { voiceChannelId: oS.channelId }
        }).catch(err => { console.log(err) })

        

        if (CGdata.voiceChannelId == nS.channelId) {
            await guild.channels.create({
                name: `${member.user.username}`,
                type: ChannelType.GuildVoice,
                parent: nS.channel.parent,
            }).then(async Channel => {
                await member.voice.setChannel(Channel);
                await voiceChannel.create({
                    voiceChannelId: Channel.id,
                    voiceChannelOwner: member.user.id,
                })
            })
        }
        
        if(VCdata === null) return;

        if(oS.channelId !== null && VCdata.voiceChannelId == oS.channelId){
            if(oS.channel.members.filter(x => !x.user.bot).size == 0){
                let channel = oS.guild.channels.cache.get(oS.channelId);
                await channel.delete();
                await voiceChannel.destroy({ where: {voiceChannelId: channel.id}})
            }
        }
    }
}