const { Schema, model } = require('mongoose')
const guild = new Schema({
    guildId: { type: String, require: true },
    WelcomeChannelId: String,
    voiceChannelId: [String]
})

module.exports = model("guildConfig", guild);