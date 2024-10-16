const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

let needus = "*Please give me a tiktok url!*" 

cmd({
    pattern: "tiktok",    
    alias: ["tt","ttdl","tiktokdl"],
    react: '📁',
    desc: "Download tiktok videos",
    category: "download",
    use: '.tiktok < tiktok url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
  
  if (!q) return await reply('TEXT') 
      if (!q.includes('tiktok')) return await reply('valid_url') 


const mov = await fetchJson(`https://api.fgmods.xyz/api/downloader/tiktok?url=${q}&apikey=mnp3grlZ`)
    
let yt = `➤ *T I K T O K - D O W N L O A D E R*

    *◦ Title:* ${mov.result.title}
      
    *◦ Region:* ${mov.result.region}
    
    *◦ Duration:* ${mov.result.duration}
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
                     title: 'DOWNLOAD VIDEO NO WATERMARK',
                     // description: `X`,
                     id: prefix + `ttdl ${mov.result.play}`
                  }, {
                     title: 'DOWNLOAD VIDEO WATERMARK',
                     // description: `X`,
                     id: prefix + `ttdl ${mov.result.wmplay}`
                  }, {
                     title: 'DOWNLOAD VIDEO AUDIO',
                     // description: `X`,
                     id: prefix + `tikmp3 ${mov.result.music}`
                  }, {
                     title: 'DOWNLOAD ORIGINAL AUDIO',
                     // description: `X`,
                     id: prefix + `tikmp3 ${mov.result.music_info.play}`
		  }]
               }]
            })
         }]
	

        let message = {
            image: mov.result.cover,
            header: '',
            footer: config.FOOTER,
            body: yt
        }   
return conn.sendButtonMessage(from, buttons, m, message) 
} catch (e) {
      if (!q) return reply('🚩 *Please give me words to search*')
      const data = await dlPanda(q)
      let wm = config.FOOTER
      if (0 === data.video.length)
      for (let i = 0; i < data.image.length; i++) await conn.sendMessage(from, { image: { url: data.image[i].src }, caption: wm }, { quoted: mek })
      else
      for (let i = 0; i < data.video.length; i++) await conn.sendMessage(from, { video: { url: data.video[i].src }, caption: wm }, { quoted: mek })
console.log(e)
reply(`${e}`)
}
})
//===========================================================================
cmd({
    pattern: "ttdl",
    alias: ["tiktokdl"],
    react: '📁',
    dontAddCommandList: true,
    use: '.tt1 <tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(needus)
let wm = config.FOOTER
await conn.sendMessage(from, { video: { url: q }, caption: wm}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
//==============================================================================

cmd({
    pattern: "tikmp3",
    alias: ["tiktokmp3"],
    react: '📁',
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(needus)
conn.sendMessage(from , { audio : { url : q  } ,mimetype: 'audio/mpeg' } , { quoted: mek })
//conn.sendMessage(from, { audio: await getBuffer(q), mimetype: 'audio/mpeg' }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
