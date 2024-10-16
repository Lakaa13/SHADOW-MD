const {cmd , commands} = require('../command')

cmd({
    pattern: "script",
    desc: "script the bot",
    category: "main",
    react: "💗",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👋 Hello ${pushname}*

*👨‍💻 SHADOW MD BOT 👨‍💻*

*shadow md is very powerful wats app bot* ➤

*⚒️ SHADOW-MD Support Channels⚒️*

*Whatsapp Channel Link:* Follow the 𝐒𝐇𝐀𝐃𝐎𝐖 𝐌𝐃 channel on WhatsApp: https://whatsapp.com/channel/0029Vajn0gb8F2pFh7PDqO0c

*❮❮ᴍᴏʀᴇ ᴅɪᴛᴇʟꜱ -* https://wa.me/+94767910958?text=_Hey÷ꜱʜᴀᴅᴏᴡ_ᴍᴅ_ʏᴏᴜ_ᴅɪᴛᴇʟꜱ_👨🏻‍💻👑📍

`
await conn.sendMessage(from,{image:{url: `https://i.imgur.com/j6U1bJq.jpeg`},caption:dec},{quoted:mek});
}catch(e){
console.log(e)
reply(`${e}`)
}
})
