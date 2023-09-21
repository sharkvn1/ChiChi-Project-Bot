module.exports = {
    data: new SlashCommandBuilder()
        .setName('testing')
        .setDescription('test cmd'),
    async execute(interaction) {
        console.log('this is a test')
    }
}