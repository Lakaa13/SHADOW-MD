// NEW ADDED NEWS SITE [ BBC , LANKADEEPA ]

const config = require('../config')
const { cmd } = require('../command')
const axios = require('axios')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================LANKADEEPA NEWS========================================

cmd({
    pattern: "lankadeepanews",
    alias: ["lankadeepa","news4"],
    react: "💭",
    desc: "",
    category: "news",
    use: '.lankadeepanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/lankadeepa`)
  
const status = `
           *💭SHADOW-MD-LANKADEPA-NEWS.LK💭*

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

➤ *Date* - ${news.result.date}

➤ *Link* - ${news.result.url}`
let buttons = [
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: 'Get Menu',
id: ".menu"
}),
}
 ]

        let opts = {
            image: `https://i.imgur.com/vUlERRz.jpeg`,
            header: "SHADOW-MD-NEWS.LK",
            footer: config.FOOTER,
            body: status
        }

        return await conn.sendButtonMessage(from, buttons, m, opts)
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})

// ================================BBC NEWS========================================

cmd({
    pattern: "bbcnews",
    alias: ["bbc","news5"],
    react: "💭",
    desc: "",
    category: "news",
    use: '.bbcnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/bbc`)
  
const status = `
           *💭SHADOW-MD-BBC-NEWS.LK💭*

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

➤ *Link* - ${news.result.url} `
let buttons = [
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: 'Get Menu',
id: ".menu"
}),
}
 ]

        let opts = {
            image: `https://i.imgur.com/e8NzxKe.jpeg`,
            header: "SHADOW-MD-NEWS.LK",
            footer: config.FOOTER,
            body: status
        }

        return await conn.sendButtonMessage(from, buttons, m, opts)
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})
