const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')


let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api;
})();


cmd({
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok videos",
    category: "download",
    react: "📁",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return await reply("Please provide a valid Tiktok video URL❗");

        const data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
        
        if (!data || !data.result) return await reply("Failed to fetch video data!");

        let result = data.result;  
        let status = ` *❮❮❮ 𝗦𝗛𝗔𝗗𝗢𝗪 𝗠𝗗 𝗧𝗜𝗞 𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ❯❯❯*`;

        let buttons = [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: 'Watch on TIKTOK',
                    url: q,
                    merchant_url: q
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "SD Quality",
                    id: ".downtt " + result.sd 
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "HD Quality",
                    id: ".downtt " + result.hd 
                }),
            }
        ];

        let message = {
            image: { url: result.thumbnail }, // Make sure thumbnail is properly provided in result
            header: '',
            footer: config.FOOTER,
            body: status
        };

        return conn.sendButtonMessage(from, buttons, m, message);
    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});


cmd({
    pattern: "downtt",
    react: "🎥",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Not Found!*');
        const data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);

        if (!data || !data.result) return await reply("Failed to fetch video data!");

        let result = data.result;
        await conn.sendMessage(from, { video: { url: result.video } }, { quoted: mek }); 

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});
