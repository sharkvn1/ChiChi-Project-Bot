const { Client, Events, ChannelType, channelLink } = require('discord.js');
const botConfig = require('../database/models/botConfig')
const voiceChannel = require('../database/models/voiceChannelCreate')

module.exports = {
    name: Events.VoiceStateUpdate,
    /**
     * 
     * @param {Client} cometta 
     */
    async execute(oS, nS) {
        let dateNow = Date.now();
        const { member, guild } = oS;
        const CGdata = await botConfig.findAll({
            where: { guildId: nS.guild.id },
            attributes: ['voiceChannelId'],
            raw: true
        })
        const VCdata = await voiceChannel.findOne({
            where: { voiceChannelId: oS.channelId },
        }).catch(err => { console.log(err) })
        
        for (const i in CGdata) {
            if (CGdata[i].voiceChannelId == nS.channelId) {
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
        }
        if (VCdata === null) return;

        if (oS.channelId !== null && VCdata.voiceChannelId == oS.channelId) {
            if (oS.channel.members.filter(x => !x.user.bot).size == 0) {
                let channel = oS.guild.channels.cache.get(oS.channelId);
                await channel.delete();
                await voiceChannel.destroy({ where: { voiceChannelId: channel.id } })
                console.log(`run time ${Date.now() - dateNow}`)
            }
        }
    }
}