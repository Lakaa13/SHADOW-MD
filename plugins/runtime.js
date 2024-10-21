const config = require('../config')
const {cmd , commands} = require('../command')
const {runtime} = require('../lib/functions')

cmd({
    pattern: "runtime",
    alias: ["status","botinfo"],
    desc: "check up time",
    category: "main",
    react: "📡",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{ 

let status =` *🚀 Runtime:-  ${runtime(process.uptime())}* `
let buttons = [
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: 'BOT SYSTEM',
id: ".system"
}),
}
 ]

        let opts = {
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
            header: "RUNTIME TEST",
            footer: config.FOOTER,
            body: status
        }
return await conn.sendButtonMessage(from, buttons, m, opts)

}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})
