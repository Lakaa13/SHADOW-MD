const config = require('../config')
const os = require('os')
const {
    cmd,
    commands
} = require('../command')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')
cmd({
        pattern: "alive",
        react: "💭",
        alias: ["online", "test", "bot"],
        desc: "Check bot online or no.",
        category: "other",
        use: '.alive',
        filename: __filename
    },
    async (conn, mek, m, {
        from,
        prefix,
        pushname,
        reply
    }) => {
        try {
            if (os.hostname().length == 12) hostname = 'replit'
            else if (os.hostname().length == 36) hostname = 'heroku'
            else if (os.hostname().length == 8) hostname = 'koyeb'
            else hostname = os.hostname()
            let monspace = '```'
            const sssf = `${monspace}👋 Hello ${pushname} I'm alive now${monspace}

*👨‍💻 Im SHADOW-MD whatsapp bot*
╭────────────────────────●●►    
| > *Version:* ${require("../package.json").version}
| > *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
| > *Runtime:* ${runtime(process.uptime())}
| > *Platform:* ${hostname}
╰────────────────────────●●►

🚀 WELCOM TO SHADOW MD 🚀*

*❯ Welcome Shado md whats app bot you can download video songs and various videos through this bot. Shado md owner is Lakshan Damayantha.. It also gives you the ability to solve the new revolution in technology and technology problems and there is great potential here. This technology is also related to AI.*
`    


            let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: config.BTN,
                        url: config.BTNURL,
                        merchant_url: config.BTNURL
                    }),
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Get Menu",
                        id: ".menu"
                    }),
                }
            ]
            let opts = {
                image: `https://i.imgur.com/Mkp0Z9o.jpeg`,
                header: '',
                footer: config.FOOTER,
                body: sssf

            }
	await conn.sendMessage(from, {
            audio: { url: 'https://github.com/Lakshanteach/RAW/raw/refs/heads/main/PTT-20241016-WA0053.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
            return await conn.sendButtonMessage(from, buttons, m, opts)
        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    })

cmd({
        pattern: "ping",
        react: "📟",
        alias: ["speed"],
        desc: "Check bot\'s ping",
        category: "other",
        use: '.ping',
        filename: __filename
    },
    async (conn, mek, m, {
        from,
        reply
    }) => {
        try {
            let inital = new Date().getTime();
            let ping = await conn.sendMessage(from, {
                text: '```Pinging To index.js!!!```'
            }, {
                quoted: mek
            })
            let final = new Date().getTime();
            return await conn.edit(ping, '*Pong*\n *' + (final - inital) + ' ms* ')
        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    })

cmd({
    pattern: "menu",
    react: "🗃️",
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

╭─────────────────────●●►
| *🚀𝙑𝙀𝙍𝙎𝙄𝙊𝙉:* ${require("../package.json").version}
| *⌛𝙈𝙀𝙈𝙊𝙍𝙔:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
| *📍𝙋𝙇𝘼𝙏𝙁𝙊𝙍𝙈:* ${hostname}
| *⏰𝗥𝗨𝗡𝗧𝗜𝗠𝗘:* ${runtime(process.uptime())}
╰─────────────────────●●►
 *💭 ➤ New version shadow md is very smart and developed with technical technology and java script, the owner takes care to update it from year to year to help the users to get various benefits We apologize if there are any problems with Shado md is, owner Lakshan damayantha 🚀💗👨‍🚀*
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
                        url: 'https://whatsapp.com/channel/0029Val6g7EBadmagKxuYi1R',
                        merchant_url: 'https://whatsapp.com/channel/0029Val6g7EBadmagKxuYi1R'
                }),
            },
            {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                    title: 'SHADOW MD BOT MAIN MENU',
                    sections: [{
                        title: 'Please select a SubMenu',
                        highlight_label: 'ꜱʜᴀᴅᴏᴡ-ᴍᴅ',
                        rows: rows
                    }]
                }),
            },
		{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: 'Bot Script🗒️',
id: ".script"
}),
	},
	{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: 'Bot Owner👨‍💻',
id: ".owner"
}),
	}
	    
        ]

        let opts = {
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
            header: '',
            footer: wm,
            body: MNG
        }

       await conn.sendMessage(from, {
            audio: { url: 'https://github.com/Lakshanteach/RAW/raw/refs/heads/main/PTT-20241008-WA0160.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
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
        let commandList = `*★──────${category} SUB COMMAND LIST──────★*\n\n> Select you want command type and enjoy shadow md whatsapp bot 👨‍💻\n\n`;

        for (let i = 0; i < commands.length; i++) {
            const cmd = commands[i];
            if (cmd.category.toUpperCase() === category) {
                commandList += `┏━━━━━━━━━━━━➤◍◉➤\n│ • *${cmd.pattern}* \n┗━━━━━━━━━━━━━━━━━━━━━━➤◍◉➤\n`;
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
      newsletterJid: '120363316527550485@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: 'ꜱʜᴀᴅᴏᴡ ᴍᴅ ᴡᴀᴛꜱ ᴀᴘᴘ ʙᴏᴛ ⚟',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029Val6g7EBadmagKxuYi1R" ,
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
