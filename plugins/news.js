const config = require('../config')
const { cmd } = require('../command')
const axios = require('axios')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================HIRU NEWS========================================

cmd({
    pattern: "news",
    desc: "news the bot",
    category: "main",
    react: "💭",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `*👋 Hello ${pushname}*

*👨‍💻 SHADOW MD BOT NEWS.LK 👨‍💻*

*shadow md is Best bot wats app* ➤

*💭 ඔබගෙ අතින් සුදුවන වැරදි අප හට වගකියනු නොලැබෙ 💭*

*💭 sri lanka the best news in shadow MD 💭*

*💡 SHADOW-MD Support Channels💭*

*Whatsapp Channel Link:* Follow the 𝐒𝐇𝐀𝐃𝐎𝐖 𝐌𝐃 channel on WhatsApp: https://whatsapp.com/channel/0029Vajn0gb8F2pFh7PDqO0c
`
let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: config.BTN,
                        url: config.BTNURL,
                        merchant_url: config.BTNURL
                    }),
                },
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                  rows: [{
                     title: 'HIRU NEWS',
                     // description: `X`,
                     id: ".hiru"
                  }, {
                     title: 'SIRASA NEWS',
                     // description: `X`,
                     id: ".sirasa"
                  }, {
                     title: 'DERANA NEWS',
                     // description: `X`,
                     id: ".derana"
                  }, {
                     title: 'LANKADEPA NEWS',
                     // description: `X`,
                     id: ".lankadeepa"
		}, {
                     title: 'BBC NEWS',
                     // description: `X`,
                     id: ".bbc"
		  }]
               }]
            })
         }]
	

        let message = {
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
            header: 'POWERD BY SHADOW NEWS . LK ➤',
            footer: config.FOOTER,
            body: status
        }   
return conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})
cmd({
    pattern: "hirunews",
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
  
const status = `
           *💭SHADOW-MD-HIRU-NEWS.LK💭*
	   
★ 𝗦𝗛𝗔𝗗𝗢𝗪 𝗠𝗗 𝗧𝗛𝗘 𝗙𝗨𝗟𝗟 𝗔𝗖𝗖𝗦𝗘𝗦 𝗡𝗘𝗪𝗦 𝗜𝗡 𝗛𝗜𝗥𝗨 𝗡𝗘𝗪𝗦 ➤
       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

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
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
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

//========sirasanews==========
cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "💭",
    desc: "",
    category: "news",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/sirasa`)
  
const status = `
           *💭SHADOW-MD-SIRASA-NEWS.LK💭*

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

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
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
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
//===========derananews======//

cmd({
    pattern: "derananews",
    alias: ["derana","news3"],
    react: "💭",
    desc: "",
    category: "news",
    use: '.derana',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/derana`)
  
const status = `
            *💭SHADOW-MD-SIRASA-NEWS.LK💭*

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

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
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
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
//========sirasanews==========
cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "💭",
    desc: "",
    category: "news",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/sirasa`)
  
const status = `
           *💭SHADOW-MD-SIRASA-NEWS.LK💭*

       
➤ *Title* - ${news.result.title}

➤ *News* - ${news.result.desc}

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
            image: `https://i.imgur.com/NAK3YWD.jpeg`,
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
