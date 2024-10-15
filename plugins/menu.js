const {cmd , commands} = require('../command')
const os = require('os')
const fs = require('fs')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')

cmd({
    pattern: "menu",
    react: "📖",
    alias: ["panel", "list", "commands", "cmd"],
    desc: "Get bot\'s command list.",
    category: "main",
    use: '.menu',
    filename: __filename
}, async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        let wm = `ꜱʜᴀᴅᴏᴡ ᴍᴅ ᴡᴀᴛꜱ ᴀᴘᴘ ʙᴏᴛ ⚟`
        if (os.hostname().length == 12) hostname = 'replit'
        else if (os.hostname().length == 36) hostname = 'heroku'
        else if (os.hostname().length == 8) hostname = 'koyeb'
        else hostname = os.hostname()
        let monspace = '```'
            const MNG = `ꜱʜᴀᴅᴏᴡ ᴍᴅ ᴡᴀᴛꜱ ᴀᴘᴘ ʙᴏᴛ ⚟
	    
${monspace}👋 Hello ${pushname}${monspace}


 *🚀𝙑𝙀𝙍𝙎𝙄𝙊𝙉:* ${require("../package.json").version}
 *⌛𝙈𝙀𝙈𝙊𝙍𝙔:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
 *📍𝙋𝙇𝘼𝙏𝙁𝙊𝙍𝙈:* ${hostname}
`
            const categories = [];
        const categoryMap = new Map();

        for (let i = 0; i < commands.length; i++) {
            const cmd = commands[i];
            if (!cmd.dontAddCommandList && cmd.pattern !== undefined) {
                const category = cmd.category.toUpperCase();
                if (!categoryMap.has(category)) {
                    categories.push(category);
                    categoryMap.set(category, []);
                }
                categoryMap.get(category).push(cmd.pattern);
            }
        }

        const rows = []
        for (const category of categories) {
            rows.push({
                header: '',
                title: `${category} MENU`,
                description: '',
                id: `${prefix}category ${category}`
            })
        }

        let buttons = [{
                name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: '',
                        url: 'https://whatsapp.com/channel/0029Vajn0gb8F2pFh7PDqO0c',
                        merchant_url: 'https://whatsapp.com/channel/0029Vajn0gb8F2pFh7PDqO0c'
                }),
            },
            {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                    title: 'Select a SubMenu',
                    sections: [{
                        title: 'Please select a SubMenu',
                        highlight_label: 'ꜱʜᴀᴅᴏᴡ-ᴍᴅ',
                        rows: rows
                    }]
                }),
            }
        ]

        let opts = {
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
            header: '',
            footer: wm,
            body: MNG
        }

        return await conn.sendButtonMessage(from, buttons, m, opts)
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})

cmd({
    pattern: "category",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        let wm = '*ꜱʜᴀᴅᴏᴡ ᴍᴅ ᴡᴀᴛꜱ ᴀᴘᴘ ʙᴏᴛ ⚟*'
        const category = q.trim().toUpperCase();
        let commandList = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;

        for (let i = 0; i < commands.length; i++) {
            const cmd = commands[i];
            if (cmd.category.toUpperCase() === category) {
                commandList += `╭────────●●►\n│ • *${cmd.pattern}* \n╰────────────────────●●►\n`;
            }
        }

        commandList += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: commandList,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: 'ꜱʜᴀᴅᴏᴡ ᴍᴅ ᴡᴀᴛꜱ ᴀᴘᴘ ʙᴏᴛ ⚟',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029Vajn0gb8F2pFh7PDqO0c" ,
thumbnailUrl: `https://i.imgur.com/2p7gHUD.jpeg` ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})
