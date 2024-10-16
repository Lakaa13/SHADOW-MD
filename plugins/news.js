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
async(conn, mek, m,{from, quoted, reply}) => {
try{

const news = await fetchJson(`${apilink}/hiru`)
  
const msg = `
           🌞 *HIRU NEWS* 🌞

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

➤ *Link* - ${news.result.url}`


        let buttons = [{
                
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                    title: 'NEWS MENU',
                    sections: [{
                        title: 'Please select a SubMenu',
                        highlight_label: 'ꜱʜᴀᴅᴏᴡ-ᴍᴅ',
                        rows:[]
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
            footer: config.FOOTER,
            body: sssf
        }

        return await conn.sendButtonMessage(from, buttons, m, opts)
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})
