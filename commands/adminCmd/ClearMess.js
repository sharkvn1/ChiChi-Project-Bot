const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Interaction } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setNameLocalizations({
            vi: 'xóa_tin_nhắn'
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .setDescription('delete messages by number in 1 channel or 1 user')
        .setDescriptionLocalizations({
            vi: 'xóa tin nhắn theo số lượng ở 1 kênh hoặc 1 người dùng',
        })
        .addChannelOption(option =>
            option.setName('channel')
                .setNameLocalizations({
                    vi: 'kênh',
                })
                .setDescription('Channel you want to delete messages')
                .setDescriptionLocalizations({
                    vi: 'Kênh xóa tin nhắn',
                })
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    vi: 'số_lượng',
                })
                .setDescription('Number of messages to delete')
                .setDescriptionLocalizations({
                    vi: 'Số lượng tin nhắn sẽ xóa',
                })
                .setMinValue(1) 
                .setMaxValue(100)
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    vi: 'người_dùng',
                })
                .setDescription('user you want to delete messages')
                .setDescriptionLocalizations({
                    vi: 'người dùng bạn muốn xóa tin nhắn',
                })
                .setRequired(false)
        ),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const {options} = interaction;

        const channel = options.getChannel('channel');
        const target = options.getUser('user');
        const amount = options.getInteger('amount');

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        if (target) {
            let i = 0;
            const fillered = [];

            (await messages).filter((msg) => {
                if (msg.author.id == target.id && amount < i) {
                    fillered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(fillered).then(messages => {
                interaction.reply({ content: `Susccesfully deleted ${messages.size} messages from ${target}.`, ephemeral: true});
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                interaction.reply({ content: `Susccesfully deleted ${messages.size} messages from channel.`,ephemeral: true});
            })
        }
    }
}