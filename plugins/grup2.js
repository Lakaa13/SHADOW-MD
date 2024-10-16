const config = require('../config')
const { cmd, commands } = require('../command')
const { default: makeWASocket, useMultiFileAuthState, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, getDevice, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys')
//-----------

cmd({
    pattern: "mute",
    react: "🔒",
    desc: "close a group",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
    
    if (!isGroup) return reply('This command can only be used in a group❗.')
        if (!isBotAdmins) return reply('කරුනාකර ශැඩො md බොට් වෙත ඇඩ්මින් ලබා දෙන්න ❗.')
        if (!isAdmins) return reply('ඔබ owner නොවෙ ❌.')
 
                                  
        await conn.groupSettingUpdate(mek.chat, 'announcement')
        const sendmsg = await conn.sendMessage(mek.chat.G_MUTE)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('🔒 GROUP IS CLOSED MY BOT OWNER')
l(e)
}
})


  
cmd({
    pattern: "unmute",
    react: "🔓",
    desc: "open a group",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
    
    if (!isGroup) return reply('This command can only be used in a group❗.')
        if (!isBotAdmins) return reply('කරුනාකර ශැඩො md බොට් වෙත ඇඩ්මින් ලබා දෙන්න ❗.')
        if (!isAdmins) return reply('ඔබ owner නොවෙ ❌.')
 
                                  
        await conn.groupSettingUpdate(mek.chat, 'not_announcement')
        const sendmsg = await conn.sendMessage(mek.chat.G_UNMUTE)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('🔓 GROUP IS OPEN MY BOT OWNER')
l(e)
}
})

cmd({
    pattern: "promote",
    desc: "Promote a member to admin.",
    category: "group",
    react: "🔼",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const user = m.mentioned[0] || m.quoted?.sender
        if (!user) return reply('Please tag or reply to a user to promote.')

        await conn.groupParticipantsUpdate(from, [user], 'promote')
        await reply(`@${user.split('@')[0]} has been promoted to admin.`, { mentions: [user] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

cmd({
    pattern: "demote",
    desc: "Demote an admin to member.",
    category: "group",
    react: "🔽",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const user = m.mentioned[0] || m.quoted?.sender
        if (!user) return reply('Please tag or reply to a user to demote.')

        await conn.groupParticipantsUpdate(from, [user], 'demote')
        await reply(`@${user.split('@')[0]} has been demoted to member.`, { mentions: [user] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

cmd({
pattern: "del",
react: "❌",
alias: [","],
desc: "delete message",
category: "group",
use: '.del',
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner ||  !isAdmins) return;
try{
if (!m.quoted) return reply(mg.notextfordel);
const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
        await conn.sendMessage(m.chat, { delete: key })
} catch(e) {
console.log(e);
reply('Error!!')
} 
})

cmd({
    pattern: "remove",
    desc: "Remove a member from the group.",
    category: "group",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const user = m.mentioned[0] || m.quoted?.sender
        if (!user) return reply('Please tag or reply to a user to remove.')

        await conn.groupParticipantsUpdate(from, [user], 'remove')
        await reply(`@${user.split('@')[0]} has been removed from the group.`, { mentions: [user] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

cmd({
    pattern: "add",
    desc: "Add a member to the group.",
    category: "group",
    react: "💫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
            
    if (!isGroup) return reply('This command can only be used in a group❗.')
        if (!isBotAdmins) return reply('කරුනාකර ශැඩො md බොට් වෙත ඇඩ්මින් ලබා දෙන්න ❗.')
        if (!isAdmins) return reply('ඔබ owner නොවෙ ❌.')
 

        const user = q.split(' ')[0]
        if (!user) return reply('Please provide a phone number to add.')

        await conn.groupParticipantsUpdate(from, [`${user}@s.whatsapp.net`], 'add')
        await reply(`@${user} has been added to the group.`, { mentions: [`${user}@s.whatsapp.net`] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "setgoodbye",
    desc: "Set the goodbye message for the group.",
    category: "group",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const goodbye = q
        if (!goodbye) return reply('Please provide a goodbye message.')

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: goodbye })
        await reply('Goodbye message has been set.')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "setwelcome",
    desc: "Set the welcome message for the group.",
    category: "group",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const welcome = q
        if (!welcome) return reply('Please provide a welcome message.')

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: welcome })
        await reply('Welcome message has been set.')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
