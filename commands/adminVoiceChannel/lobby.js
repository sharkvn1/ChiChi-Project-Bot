const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, ActionRowBuilder, PermissionFlagsBits, ChannelType, Interaction, ButtonStyle } = require('discord.js');
const botConfig = require('../../database/models/botConfig')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lobby')
        .setDescription('Config your lobby')
        .setNameLocalizations({
            vi: 'lobby',
        })
        .setDescriptionLocalizations({
            vi: 'cấu hình lobby',
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)

        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('add a new lobby')
                .setNameLocalizations({
                    vi: 'thêm'
                })
                .setDescriptionLocalizations({
                    vi: 'thêm lobby mới'
                })
                .addChannelOption(option =>
                    option.setName('channel')
                        .setNameLocalizations({
                            vi: 'kênh',
                        })
                        .setDescription('channel you want to be a new lobby')
                        .setDescriptionLocalizations({
                            vi: 'kênh bạn muốn add làm lobby mới',
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('romeve a lobby')
                .setNameLocalizations({
                    vi: 'xóa',
                })
                .setDescriptionLocalizations({
                    vi: 'xóa lobby'
                })
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('channel you want to be removed')
                        .setNameLocalizations({
                            vi: 'kênh'
                        })
                        .setDescriptionLocalizations({
                            vi: 'lobby bạn muốn xóa'
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('setup voiceChannel dashboard')
                .setNameLocalizations({
                    vi: 'thiết-lập'
                })
                .setDescriptionLocalizations({
                    vi: 'Thiết lập bảng điều khiển'
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
        ),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const cmd = options.getSubcommand();
        const textChannel = options.getChannel('channel');

        switch (cmd) {
            case 'add':
                try {
                    await botConfig.create({
                        voiceChannelId: textChannel.id,
                        guildId: interaction.member.guild.id,
                    }).then(vc => {
                        interaction.reply('Successfully added');
                    })
                } catch (err) {
                    if (err === 'SequelizeUniqueConstraintError') {
                        // TODO: finish the reply
                        return interaction.reply('err')
                    }
                }
                break;

            case 'remove':
                const find = await botConfig.destroy({ where: { voiceChannelId: textChannel.id } });
                if (!find) return interaction.reply('cannot find channel');
                interaction.reply(`successfully removed **${textChannel.name}**`)
                break;

            case 'setup':
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
                interaction.reply({ content: `Successfully setup voiceChannel dashboard in ${textChannel}`, ephemeral: true })
                textChannel.send({ embeds: [dashboard], components: [rowOne, rowTwo] })
                break;
        }
    }
}