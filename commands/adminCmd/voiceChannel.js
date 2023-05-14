const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ActionRowBuilder, PermissionFlagsBits, ChannelType, Interaction, ButtonStyle } = require('discord.js');
const guildConfig = require('../../database/guildConfig');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('voicechannel')
        .setNameLocalizations({
            vi: 'kênh_thoại',
        })
        .setDescription('Config Bot Voice Channel Function')
        .setDescriptionLocalizations({
            vi: 'cài đặt chức năng kênh thoại của bot',
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName('lobby_add')
                .setDescription('add a new temporary voice channel lobby')
                .setNameLocalizations({
                    vi: 'thêm_sảnh'
                })
                .setDescriptionLocalizations({
                    vi: 'thêm sảnh kênh thoại tạm thời mới'
                })
                .addChannelOption(option =>
                    option.setName('channel')
                        .setNameLocalizations({
                            vi: 'kênh',
                        })
                        .setDescription('voice channel you want to be a new lobby')
                        .setDescriptionLocalizations({
                            vi: 'kênh thoại bạn muốn thêm làm sảnh mới',
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lobby_remove')
                .setNameLocalizations({
                    vi: 'xóa_sảnh',
                })
                .setDescription('romeve a lobby')
                .setDescriptionLocalizations({
                    vi: 'xóa sảnh hiện có'
                })
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('lobby you want to be removed')
                        .setNameLocalizations({
                            vi: 'kênh'
                        })
                        .setDescriptionLocalizations({
                            vi: 'sảnh bạn muốn xóa'
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('dashboard')
                .setDescription('setup temporary voiceChannel dashboard')
                .setNameLocalizations({
                    vi: 'bảng_điều_khiển'
                })
                .setDescriptionLocalizations({
                    vi: 'Thiết lập bảng điều khiển kênh thpại tạm thời'
                })
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('channel you want to be setup dashboard')
                        .setNameLocalizations({
                            vi: 'kênh'
                        })
                        .setDescriptionLocalizations({
                            vi: 'Kênh bạn muốn thiết lập bảng điều khiển'
                        })
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lobby_list')
                .setDescription('list of lobby you have in server')
                .setNameLocalizations({
                    vi: 'danh_sách_sảnh'
                })
                .setDescriptionLocalizations({
                    vi: 'danh sách những sảnh bạn có trong máy chủ'
                })
        ),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const cmd = options.getSubcommand();
        const Channel = options.getChannel('channel');
        const guildId = interaction.guildId;

        switch (cmd) {
            case 'lobby_add':
                await guildConfig.updateOne(
                    { guildId: guildId, },
                    { $push: { voiceChannelId: Channel } }
                ).then(vc => {
                    interaction.reply(`Successfully added ${Channel}`);
                })
                break;
            case 'lobby_remove':
                await guildConfig.updateOne(
                    { guildId: guildId, },
                    { $pull: { voiceChannelId: Channel } }
                ).then(data => {
                    if (data.modifiedCount === 0) {
                        return interaction.reply('cannot find channel');
                    } else interaction.reply(`successfully removed **${textChannel.name}**`)
                })
                break;

            case 'dashboard':
                const dashboard = new EmbedBuilder()
                    .setColor('#5e3fb4')
                    .setAuthor({ name: 'VoiceChannel Dashboard', iconURL: interaction.user.displayAvatarURL() })
                    .setDescription('click to button to control your voice channel')
                    .setTimestamp()
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })

                const rowOne = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('🔒')
                            .setLabel('lock')
                            .setCustomId('lock Channel'),
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('🔓')
                            .setLabel('unlock')
                            .setCustomId('unlock Channel'),
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('📝')
                            .setLabel('rename')
                            .setCustomId('rename Channel'),
                    )
                const rowTwo = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('👁️')
                            .setLabel('unhide Channel')
                            .setCustomId('unHide'),
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('🚫')
                            .setLabel('hide')
                            .setCustomId('hide'),
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('🔢')
                            .setLabel('Customize')
                            .setCustomId('customize'),
                    )
                interaction.reply({ content: `Successfully setup voiceChannel dashboard in ${Channel}`, ephemeral: true })
                Channel.send({ embeds: [dashboard], components: [rowOne, rowTwo] })
                break;
            case 'lobby_list':
                const listEmbed = new EmbedBuilder()
                    .setColor('#5e3fb4')
                    .setAuthor({ name: `list of lobby in **${interaction.guild.name}**`, iconURL: interaction.guild.iconURL() })
                    .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
                const listData = await guildConfig.findOne({ guildId: guildId })
                for (const i in listData.voiceChannelId) {
                    listEmbed
                        .addFields({ name: `Lobby ${i + 1}`, value: `<#${listData.voiceChannelId[i]}>` })
                }
                interaction.reply({ embeds: [listEmbed], ephemeral: true });
                break;
        }
    }
}