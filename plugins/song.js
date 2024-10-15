const config = require('../config');
const { cmd, commands } = require('../command');
const dl = require('@bochilteam/scraper');
const fg = require('api-dylux');
const fs = require('fs-extra');
const yts = require('yt-search');

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

// Command for downloading songs
cmd({
    pattern: "song",
    alias: ["play", "ytmp3", "yta", "lagu"],
    use: '.song <song name>',
    react: "🎧",
    desc: "Search & download yt song.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, prefix, isCmd, command, args, q }) => {
    try {
        if (!q) return reply("Please provide a song name.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const url = data.url;
        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        const msg =  = `\`❮❮ 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ❯❯\`

> *\`➤ Title\` :* ${result.title}

> *\`➤ Views\` :* ${result.views}

> *\`➤ Duration\` :* ${result.duration}

> *\`➤ URL\` :* ${result.url}

ꜱʜᴀᴅᴏᴡ ᴍᴅ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴅᴇʀ
`


        let buttons = [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: config.BTN,
                    url: config.BTNURL
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Audio🎧",
                    id: `${prefix}audsong ${data.url}`
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Document📁",
                    id: `${prefix}dosong ${data.url}`
                })
            }
        ];

        let message = {
            image: data.thumbnail,
            footer: config.FOOTER,
            body: msg,
            forwardingScore: 9999,
            isForwarded: true
        };
        
        await conn.sendButtonMessage(from, buttons, m, message);
    } catch (e) {
        console.log(e);
        reply("🚩 Not Found !");
    }
});

// Command for downloading audio
cmd({
    pattern: "audsong",
    alias: ["play", "ytmp3", "yta", "lagu"],
    use: '.audsong <song url>',
    react: "🎧",
    desc: "Download audio from YouTube.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    try {
        if (!q) return reply("Please provide a song URL.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const url = data.url;
        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply('Error !!');
    }
});

// Command for downloading song as a document
cmd({
    pattern: "dosong",
    alias: ["play", "ytmp3", "yta", "lagu"],
    use: '.dosong <song url>',
    react: "🎧",
    desc: "Download song as document.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    try {
        if (!q) return reply("Please provide a song URL.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const url = data.url;
        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            mimetype: "video/mp4",
            fileName: `${data.title}.mp4`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply("🚩 Not Found !");
    }
});

// Command for downloading video
cmd({
    pattern: "video",
    react: "📽️",
    desc: "Download video from YouTube.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, prefix, isCmd, command, args, q }) => {
    try {
        if (!q) return reply("Please provide a URL or title.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const url = data.url;
        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        const msg =  = `\`❮❮ 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ❯❯\`

> *\`➤ Title\` :* ${result.title}

> *\`➤ Views\` :* ${result.views}

> *\`➤ Duration\` :* ${result.duration}

> *\`➤ URL\` :* ${result.url}

ꜱʜᴀᴅᴏᴡ ᴍᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴅᴇʀ
`


        let buttons = [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: config.BTN,
                    url: config.BTNURL
                }),
            },
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'Tap Here!',
                    sections: [{
                        rows: [{
                            title: 'VIDEO🎥',
                            id: `${prefix}vvideo ${data.url}`
                        }, {
                            title: 'DOCUMENT📁',
                            id: `${prefix}ddocument ${data.url}`
                        }]
                    }]
                })
            }
        ];

        let message = {
            image: data.thumbnail,
            footer: config.FOOTER,
            body: msg
        };

        await conn.sendButtonMessage(from, buttons, m, message);
    } catch (e) {
        console.log(e);
        reply("🚩 Not Found !");
    }
});

// Command for downloading video
cmd({
    pattern: "vvideo",
    react: "📽️",
    desc: "Download video from YouTube.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    try {
        if (!q) return reply("Please provide a URL or title.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const url = data.url;
        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply("🚩 Not Found !");
    }
});

// Command for downloading video as a document
cmd({
    pattern: "ddocument",
    react: "✅",
    desc: "Download video as document.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    try {
        if (!q) return reply("Please provide a URL or title.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const url = data.url;
        const down = await fg.yta(url);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            mimetype: "video/mp4",
            caption: "💻MADE BY SHADOW",
            fileName: `${data.title}.mp4`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply("🚩 Not Found !");
    }
});

// Command for searching YouTube
cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts <query>',
    react: "🔎",
    desc: 'Search videos from YouTube',
    category
