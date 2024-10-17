const config = require('../config');
const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// Command for downloading songs
cmd({
    pattern: "song",
    alias: ["play", "ytmp3", "yta", "lagu"],
    use: '.song <song name>',
    react: "🍟",
    desc: "Search & download yt song.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("Please provide a song name.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const down = await fg.yta(data.url);
        const downloadUrl = down.dl_url;

        const msg = `\`✦ Qᴜᴇᴇɴ-ᴋᴇɴᴢɪ ᴍᴅ ᴠ2 ✦\`
       \`❒ 𝗦𝗼𝗻𝗴 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 ❒\`
       \`❡ Title\` : ${data.title}
       \`❡ Views\` : ${data.views}
       \`❡ Duration\` : ${data.timestamp}
       \`❡ Url\` : ${data.url}`;

        let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Audio",
                    id: `audsong ${data.url}`
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Document",
                    id: `dosong ${data.url}`
                })
            }
        ];

        await conn.sendButtonMessage(from, {
            image: data.thumbnail,
            footer: config.FOOTER,
            body: msg
        }, buttons, m);
    } catch (e) {
        console.error(e);
        reply("🚩 Not Found !");
    }
});

// Command for downloading audio
cmd({
    pattern: "audsong",
    use: '.audsong <song url>',
    react: "🍟",
    desc: "Download audio from YouTube.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("Please provide a song URL.");
        
        const down = await fg.yta(q);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply('Error !!');
    }
});

// Command for downloading song as a document
cmd({
    pattern: "dosong",
    use: '.dosong <song url>',
    react: "🍟",
    desc: "Download song as document.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("Please provide a song URL.");
        
        const down = await fg.yta(q);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${q}.mp3`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
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
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("Please provide a URL or title.");
        
        const search = await yts(q);
        const data = search.videos[0];
        
        if (!data) return reply("No results found!");

        const down = await fg.yta(data.url);
        const downloadUrl = down.dl_url;

        const msg = `\`✦ Qᴜᴇᴇɴ-ᴋᴇɴᴢɪ ᴍᴅ ᴠ2 ✦\`
       \`❒ 𝗩𝗶𝗱𝗲𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 ❒\`
       \`❡ Title\` : ${data.title}
       \`❡ Views\` : ${data.views}
       \`❡ Duration\` : ${data.timestamp}
       \`❡ Url\` : ${data.url}`;

        let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Download Video",
                    id: `vvideo ${data.url}`
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Download as Document",
                    id: `ddocument ${data.url}`
                })
            }
        ];

        await conn.sendButtonMessage(from, {
            image: data.thumbnail,
            footer: config.FOOTER,
            body: msg
        }, buttons, m);
    } catch (e) {
        console.error(e);
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
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("Please provide a URL or title.");
        
        const down = await fg.yta(q);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("🚩 Not Found !");
    }
});

// Command for downloading video as a document
cmd({
    pattern: "ddocument",
    react: "🚩",
    desc: "Download video as document.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("Please provide a URL or title.");
        
        const down = await fg.yta(q);
        const downloadUrl = down.dl_url;

        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            mimetype: "video/mp4",
            caption: "💻 MADE BY DANUPA 💻",
            fileName: `${q}.mp4`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("🚩 Not Found !");
    }
});
