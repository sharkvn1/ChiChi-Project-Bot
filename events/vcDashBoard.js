const { Events, Interaction, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const voiceChannel = require('../database/models/voiceChannelCreate')
module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const vcChannel = interaction.member.voice.channel;
        if (!vcChannel) return;

        if (interaction.isButton()) {

            const vcData = await voiceChannel.findOne({
                where: { voiceChannelOwner: interaction.member.id }
            })

            if (!vcData) {
                interaction.reply({ content: '!You must be in a temp voice channel!', ephemeral: true })
                return;
            }
            if (vcData.voiceChannelOwner != interaction.member.id) {
                interaction.reply({ content: '!You are not owner of this voice channel!', ephemeral: true })
                return;
            }

            switch (interaction.customId) {
                case 'lock Channel':
                    await interaction.deferUpdate().catch(() => { });
                    interaction.member.voice.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [
                                PermissionFlagsBits.Connect
                            ]
                        }
                    ])
                    interaction.followUp({ content: `Successful lock the channel ${interaction.member.voice.channel.name}`, ephemeral: true })
                    break;

                case 'unlock Channel':
                    await interaction.deferUpdate().catch(() => { });
                    interaction.member.voice.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.roles.everyone.id,
                            allow: [
                                PermissionFlagsBits.Connect
                            ]
                        }
                    ])
                    interaction.followUp({ content: `Successful Unlock the channel ${interaction.member.voice.channel.name}`, ephemeral: true })
                    break;

                case 'rename Channel':
                    const modal = new ModalBuilder()
                        .setCustomId('renameModal')
                        .setTitle('Rename Channel')
                    const name = new TextInputBuilder()
                        .setStyle(TextInputStyle.Short)
                        .setLabel('NAME')
                        .setMaxLength(50)
                        .setCustomId('Name')
                        .setRequired(true)
                    const row = new ActionRowBuilder().addComponents(name)
                    modal.addComponents(row)

                    await interaction.showModal(modal)
                    break;
                case 'unHide':
                    await interaction.deferUpdate().catch(() => { });
                    interaction.member.voice.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.roles.everyone.id,
                            allow: [
                                PermissionFlagsBits.ViewChannel
                            ]
                        }
                    ])
                    interaction.followUp({ content: `Successful UnHide the channel ${interaction.member.voice.channel.name}`, ephemeral: true })
                    break;

                case 'hide':
                    await interaction.deferUpdate().catch(() => { });
                    interaction.member.voice.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [
                                PermissionFlagsBits.ViewChannel
                            ]
                        }
                    ])
                    interaction.followUp({ content: `Successful Hide the channel ${interaction.member.voice.channel.name}`, ephemeral: true })
                    break;
                case 'customize':
                    const modalLimit = new ModalBuilder()
                        .setCustomId('limitModal')
                        .setTitle('Set limit member')
                    const Limit = new TextInputBuilder()
                        .setStyle(TextInputStyle.Short)
                        .setLabel('Number of member')
                        .setMaxLength(2)
                        .setCustomId('Limit')
                        .setRequired(true)
                    const Row = new ActionRowBuilder().addComponents(Limit)
                    modalLimit.addComponents(Row)
                    await interaction.showModal(modalLimit)
                    break;
            }
        } else if (interaction.isModalSubmit()){

            const vcData = await voiceChannel.findOne({
                where: { voiceChannelOwner: interaction.member.id }
            })

            if (!vcData) {
                interaction.reply({ content: '!You must be in a temp voice channel!', ephemeral: true })
                return;
            }

            if (vcData.voiceChannelOwner != interaction.member.id) {
                interaction.reply({ content: '!You are not owner of this voice channel!', ephemeral: true })
                return;
            }

            switch(interaction.customId){
                case 'renameModal':
                const Name = interaction.fields.getTextInputValue('Name');
                await vcChannel.setName(Name);
                interaction.reply({ content: `Successful change channel name to **${Name}**`, ephemeral: true })
                break;
                case 'limitModal':
                const num = interaction.fields.getTextInputValue('Limit');
                if(vcChannel.userLimit == num) return interaction.reply({ content: `The user limit is already **${num}**`, ephemeral: true })
                await vcChannel.setUserLimit(num);
                interaction.reply({ content: `Successful change channel user limit to **${num}**`, ephemeral: true })
            }
        }
    }
}