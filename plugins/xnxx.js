const { cmd, commands } = require('../command');
const xnxx = require("xnxx-dl");
const { fetchJson, getBuffer } = require('../lib/functions');

// XNXX video download command with button-style selection
cmd({
    pattern: "xnxx",
    desc: "Searches and downloads a video from XNXX",
    use: ".xnxx <search_term>",
    react: "📥",
    category: "downloads",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply, client }) => {
    const searchTerm = q.trim();
    if (!searchTerm) return reply(`Please provide a search term`);

    reply(`Searching for your video ➤...`);
    try {
        // Search for multiple video options
        const searchResults = await xnxx.search(searchTerm);
        if (!searchResults || searchResults.length === 0) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        // Create buttons for the user to choose which video to download
        const buttons = searchResults.slice(0, 5).map((video, index) => ({
            buttonId: `xnxx_select_${index}`,
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
        client.on('button_click', async (buttonMek) => {
            const buttonId = buttonMek.buttonId;
            const selectedIndex = parseInt(buttonId.replace('xnxx_select_', ''));
            const selectedVideo = searchResults[selectedIndex];

            if (!selectedVideo) {
                return reply(`Invalid selection, please try again.`);
            }

            reply(`Downloading video...`);
            const videoUrl = selectedVideo.link_dl;
            await conn.sendMessage(
                from,
                { video: { url: videoUrl }, caption: '*SHADOW MD*', mimetype: 'video/mp4' },
                { quoted: mek }
            );

            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
        });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});

module.exports = {};
