const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

const apilink = 'https://dark-yasiya-api-new.vercel.app'; // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "xvdl",
    alias: ["xvideo", "xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < text >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("Please give me a few words!");

        const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${q}`);
        if (xv_list.result.length === 0) return await reply("No results found!");

        const buttons = xv_list.result.slice(0, 5).map((video, index) => ({
            buttonId: `xvideo_select_${index}`,
            buttonText: { displayText: video.title },
            type: 1
        }));

        const buttonMessage = {
            text: 'Select the video you want to download:',
            footer: 'SHADOW MD',
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

        // Handle button selection
        conn.on('button_click', async (buttonMek) => {
            const buttonId = buttonMek.buttonId;
            const selectedIndex = parseInt(buttonId.replace('xvideo_select_', ''));
            const selectedVideo = xv_list.result[selectedIndex];

            if (!selectedVideo) {
                return reply(`Invalid selection, please try again.`);
            }

            const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${selectedVideo.url}`);

            const msg = `
            *XVIDEO DOWNLOADER BY SHADOW* 

            • *Title* - ${xv_info.result.title}
            • *Views* - ${xv_info.result.views}
            • *Likes* - ${xv_info.result.like}
            • *Dislikes* - ${xv_info.result.deslike}
            • *Size* - ${xv_info.result.size}
            `;

            await conn.sendMessage(from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek });

            // SEND VIDEO
            await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });
        });
    } catch (error) {
        console.log(error);
        reply("An error occurred while processing your request.");
    }
});
