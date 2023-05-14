const { Schema, model } = require('mongoose')
const vc = new Schema({
    guildId: { type: String, require: true },
    channelId: String,
    owner: String,
})

module.exports = model('tempVC', vc);