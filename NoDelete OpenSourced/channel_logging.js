const discord = require("discord.js")
const config = require("./config.json")

module.exports = async function(msg) {
    let guild = await msg.client.guild.channels.fetch(config.logging_channel_id)
    let attachments = msg.attachments
    let emb_arr = [] 

    let embed = new discord.MessageEmbed()
    .setTitle(msg.author.tag)
    .setDescription(msg.content)
    emb_arr.push(embed)
    let emb_att = new discord.MessageEmbed()
    .setTitle("Attachment(s)")
    .setDescription(attachments.map(ret => `[${ret.name}](${ret.url})`).join('\n'))
            
    if (attachments.size > 0) {
        emb_arr.push(emb_att)
    }
    if (msg.guild.members.me.permissionsIn(msg.channel).has("SEND_MESSAGES")) {
        guild.send({
            content: `Message deleted in ${msg.channel}`,
            embeds: emb_arr
        })
    }
}