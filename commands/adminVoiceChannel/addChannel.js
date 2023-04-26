const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, Interaction } = require('discord.js');
const voiceChannelConfig = require('../../database/models/voiceChannelConfig')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lobby-config')
        .setDescription('Config your lobby')
        // todo: change the localization
        .setNameLocalizations({
            vi: 'thêm-lobby',
        })
        .setDescriptionLocalizations({
            vi: 'thêm lobby mới',
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)

        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('add a new lobby')
                // TODO: change the localization
                .setNameLocalizations({
                    vi: 'stm'
                })
                .setDescriptionLocalizations({
                    vi: 'stm'
                })
                .addChannelOption(option =>
                    option.setName('channel')
                        .setNameLocalizations({
                            vi: 'kênh',
                        })
                        .setDescription('channel you want to be a new lobby')
                        .setDescriptionLocalizations({
                            vi: 'kênh bạn muốn add',
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('romeve a lobby')
                // todo: change the localization
                .setNameLocalizations({
                    vi: 'stmm',
                })
                .setDescriptionLocalizations({
                    vi: 'stm'
                })
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('channel you want to be removed')
                        // todo: change the localization
                        .setNameLocalizations({
                            vi: 'stm'
                        })
                        .setDescriptionLocalizations({
                            vi: 'stm'
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
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
        const channel = options.getChannel('channel');

        switch (cmd){
            case 'add':
            try {
                await voiceChannelConfig.create({
                    voiceChannelId: channel.id,
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
                const find = await voiceChannelConfig.destroy({ where: {voiceChannelId: channel.id}});
                if (!find) return interaction.reply('cannot find channel');
                interaction.reply(`successfully removed **${channel.name}**`)
            break;
        }
        
    }
}