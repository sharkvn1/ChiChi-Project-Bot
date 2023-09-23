const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const guildConfig = require('../../database/guildConfig');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setNameLocalizations({
            vi: 'cấu_hình'
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .setDescription('Configure the bot systems')
        .setDescriptionLocalizations({
            vi: 'cấu hình các hệ thống của bot'
        })
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome_channel')
                .setDescription('config welcome channel')
                .setNameLocalizations({
                    vi: 'kênh_chào_mừng'
                })
                .setDescriptionLocalizations({
                    vi: 'cấu hình kênh chào mừng của máy chủ'
                })
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('channel you want to set')
                        .setNameLocalizations({
                            vi: 'kênh'
                        })
                        .setDescriptionLocalizations({
                            vi: 'kênh bạn muốn chọn làm kênh chào mừng'
                        })
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check_config')
                .setDescription('check your bot configuration')
                .setNameLocalizations({
                    vi: 'kiểm_tra'
                })
                .setDescriptionLocalizations({
                    vi: 'kiểm tra các cấu hình của bot'
                })
        ),
    async execute(interaction) {
        const { options } = interaction
        const cmd = options.getSubcommand();
        const channel = options.getChannel('channel');
        const guildId = interaction.guildId;

        switch (cmd) {
            case 'welcome_channel':
                await guildConfig.updateOne(
                    { guildId: guildId, },
                    { $pull: { welcomeChannelId: channel } }
                ).then(vc => {
                    interaction.reply(`Successfully added ${channel}`);
                })
                break;
            case 'check_config':
                const configData = await guildConfig.findOne({ guildId: guildId });
                const embed = new EmbedBuilder()
                    .setColor('#ffc530')
                    .setAuthor({ name: `Bot configuration in ${interaction.guild}!`, iconURL: interaction.guild.iconURL() })
                    .setTimestamp()
                    .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })


                if (configData.WelcomeChannelId == '0') {
                    embed
                        .addFields({ name: 'Welcome Channel', value: 'No welcome channel has been added!' })
                } else {
                    embed
                        .addFields({ name: 'Welcome Channel', value: `${configData.WelcomeChannelId}` })
                }

                embed
                    .addFields({ name: '\u200B', value: '**Voice channel lobby list: **' })

                if (configData.voiceChannelId.length == 0) {
                    embed
                        .addFields({ name: 'Lobby 0', value: 'No lobby has been added!' })
                } else {
                    for (const i in configData.voiceChannelId) {
                        embed
                            .addFields({ name: `Lobby ${i + 1}`, value: `<#${configData.voiceChannelId[i]}>`, inline: true })
                    }
                }

                interaction.reply({ embeds: [embed] });
        }
    }
}