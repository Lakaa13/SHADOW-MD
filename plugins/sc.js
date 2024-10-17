

cmd({
    pattern: "ruls",
    react: "📔",
    alias: ["rl"],
    desc: "Get bot\'s script list.",
    category: "main",
    use: '.script',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let tex = `
> 🚀𝗛𝗲𝘆👋 *${pushname}* 𝗦𝗛𝗔𝗗𝗢𝗪 𝗠𝗗 𝗕𝗢𝗧 🧙‍♂️🔊🚀

 *𝐀𝐫𝐞 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐒𝐜𝐫𝐢𝐩𝐭 😾💫* 

*👨‍💻ρℓєαѕє ¢σηтα¢т му σωηєя⚖️*
 
                   *💫𝗥𝗨𝗟𝗦𝗘💫*

*🚀𝟷. sᴘᴀᴍ ʙᴏᴛs ᴀʀᴇ ᴘʀᴏʜɪʙɪᴛᴇᴅ.👨‍💻💯*
*🚀𝟸. ᴄᴀʟʟɪɴɢ ʙᴏᴛs ɪs ᴘʀᴏʜɪʙɪᴛᴇᴅ.👨‍💻💯*
*🚀𝟹. ᴄᴀʟʟɪɴɢ ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ ɪs ᴘʀᴏʜɪʙɪᴛᴇᴅ.👨‍💻💯*
*🚀𝟺. sᴘᴀᴍ ᴛᴏ ɴᴏ ᴏᴡɴᴇʀ ɪs ᴘʀᴏʜɪʙɪᴛᴇᴅ.👨‍💻🚀*

*ωнαтѕαρρ*- : +94767910958
> shadow md main owner sc 👨‍💻
`
await conn.sendMessage(from,{image:{url: `https://i.imgur.com/j6U1bJq.jpeg`},caption:dec},{quoted:mek});
}catch(e){
console.log(e)
reply(`${e}`)
}
})
