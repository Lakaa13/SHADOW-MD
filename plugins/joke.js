const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "😗",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

> ❯❯ ꜱʜᴀᴅᴏᴡ-ᴍᴅ ᴡᴀᴛꜱ ᴀᴘᴘ ʙᴏᴛ ➣`;
text: desc,
          contextInfo

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: ' SHADOW-MD ',
          newsletterJid: "120363290448968237@newsletter",
          },
          externalAdReply: {
              title: ` SHADOW`,
              thumbnailUrl: `https://i.imgur.com/2p7gHUD.jpeg`,
              sourceUrl: `https://whatsapp.com/channel/0029Val6g7EBadmagKxuYi1R`,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ cloud'т fuetch a foke right now. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});
