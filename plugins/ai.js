const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')
cmd({
    pattern: "ai",
    react: "🧠",
    desc: "ai chat",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "genimg",
    desc: "Ai image.",
    react: "🧠",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://api.vihangayt.com/ai/stablediff?prompt=${q}&negprompt=not%20hd,%20watermark` },caption: '> *ꜱʜᴀᴅᴏᴡ-ᴍᴅ-ᴏᴡɴᴇʀ 💗➤*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//======Wallpaper=====

cmd({
    pattern: "gemini",
    desc: "Ai chat.",
    react: "🧠",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let res = await fetchJson(`https://api.vihangayt.com/ai/gemini?q=${q}`)
//----------------------------------
let data = res.data

await reply(data.response)

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//======gpt4=======

cmd({
    pattern: "gpt",
    desc: "Ai chat.",
    react: "🧠",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let data = await fetchJson(`https://api.vihangayt.com/ai/gpt?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "lamda",
    desc: "Ai chat.",
    react: "🧠",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let data = await fetchJson(`https://api.vihangayt.com/ai/lamda?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "lalaland",
    desc: "Ai chat.",
    react: "🧠",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let data = await fetchJson(`https://api.vihangayt.com/ai/lalaland?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
            name: "brainshop",
            react: "🧠",
            alias: ['bsai', 'brainshopai'],
            need: "text",
            category: "ai",
            desc: "Chat to brain Shop Ai",
            cooldown: 10,
            filename: __filenam
          },
           async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
            try{
            const sendAiResponse = (response) => {
                pika.reply(`*🚀 bsAi :* ${response}\n\n> ${Config.footer}`);
            }
            if (args.length < 1) return sendAiResponse("Enter some prompts to continue!");
            brainShopAi(pika.sender.split("@")[0], args.join(" "))
            .then(response=> {
                if (!response.status || !response.message) return sendAiResponse("Failed to proceed, try again later!");
                return sendAiResponse(response.message);
              }catch(e){
              console.log(e)
              reply(`${e}`)
}
})
            
