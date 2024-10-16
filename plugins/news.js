const config = require('../config')
const { cmd } = require('../command')
const axios = require('axios')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================HIRU NEWS========================================

cmd({
    pattern: "news",
    alias: ["hiru","news1"],
    react: "💭",
    desc: "",
    category: "news",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/hiru`)
  
const msg = `
           🌞 *HIRU NEWS* 🌞

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

➤ *Link* - ${news.result.url}`


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
                    title: 'NEWS MENU',
                    sections: [{
                        title: 'Please select a SubMenu',
                        highlight_label: 'ꜱʜᴀᴅᴏᴡ-ᴍᴅ',
                        rows: rows
                    }]
                }),
                
                name: "hiru",
                buttonParamsJson: JSON.stringify({
                    display_text: "hiru",
                    id: ".hiru"
                }),
            },
                       {
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
