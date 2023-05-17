const discord = require("discord.js")
const client = new discord.Client({
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES",
        "GUILD_EMOJIS_AND_STICKERS"
    ]
})
const config = require("./config.json")
const channel_logging = require("./channel_logging.js")

client.on("messageDelete", async obj => {
    if (obj.author.bot) return
    if (config.logging_channel_id == null || config.logging_channel_id == "") {
        let emb_arr = [] //reused lol
        let attachments = obj.attachments

        let embed = new discord.MessageEmbed()
        .setTitle(obj.author.tag)
        .setDescription(obj.content)
        emb_arr.push(embed)
        let emb_att = new discord.MessageEmbed()
        .setTitle("Attachment(s)")
        .setDescription(attachments.map(ret => `[${ret.name}](${ret.url})`).join('\n'))
            
        if (attachments.size > 0) {
            emb_arr.push(emb_att)
        }
        if (obj.guild.members.me.permissionsIn(obj.channel).has("SEND_MESSAGES")) {
            obj.channel.send({
                embeds: emb_arr
            })
        }
    } else {
        channel_logging(obj)
    }
})

client.login(config.bot_token).then(() => {
    console.log("ok i'm online")
})