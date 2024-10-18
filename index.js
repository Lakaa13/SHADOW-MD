const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const NodeCache = require('node-cache')
const util = require('util')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
    fetchBuffer,
    getFile
} = require('./lib/functions')
const {
    sms,
    downloadMediaMessage
} = require('./lib/msg')
const axios = require('axios')
const {
    File
} = require('megajs')
const path = require('path')
const msgRetryCounterCache = new NodeCache()
const prefix = '.'
const ownerNumber = ['94767910958']

//===================SESSION============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if (config.SESSION_ID) {
        const sessdata = config.SESSION_ID.replace("SHADOW=", "")
        const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
        filer.download((err, data) => {
            if (err) throw err
            fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
                console.log("Session download completed !!")
            })
        })
    }
}

// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

async function connectToWA() {
    const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
    
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
    const conn = makeWASocket({
        logger: P({ level: "fatal" }).child({ level: "fatal" }),
        printQRInTerminal: false,
        generateHighQualityLinkPreview: true,
        auth: state,
        defaultQueryTimeoutMs: undefined,
        msgRetryCounterCache
    })

    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close' && lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
            connectToWA()
        } else if (connection === 'open') {
            console.log('Installing plugins 🔌... ')
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() === ".js") {
                    require("./plugins/" + plugin)
                }
            })
            console.log('Plugins installed ✅')
            console.log('Bot connected ✅')
            
            let up = `🚀SHADOW-MD CONNECTED SUCCESSFUL✅ \n👑WELCOME TO SHADOW MD MULTIDEVICE WHATSAPP BOT👑\n*🚀 OWNER: Lakshan damayantha 👨‍💻*\n*🔹 CONTACT : https://wa.me/+94767910958*\n🚀 PREFIX: ( . )*`
            conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://i.imgur.com/pJ5WluK.jpeg` }, caption: up })
        }
    })

    conn.ev.on('creds.update', saveCreds)
    conn.ev.on('messages.upsert', async (mek) => {
        try {
            mek = mek.messages[0]
            if (!mek.message) return

            mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
                await conn.readMessages([mek.key])
            }

            const m = sms(conn, mek)
            const type = getContentType(mek.message)
            const from = mek.key.remoteJid
            const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            const isCmd = body.startsWith(prefix)
            const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(' ')
            const isGroup = from.endsWith('@g.us')
            const sender = mek.key.fromMe ? conn.user.id : (mek.key.participant || mek.key.remoteJid)
            const senderNumber = sender.split('@')[0]

            const reply = async (teks) => {
                return await conn.sendMessage(from, { text: teks }, { quoted: mek })
            }

            // Handle commands
            switch (command) {
                case 'jid':
                    reply(from)
                    break
                case 'device': {
                    let deviceq = getDevice(mek.message.extendedTextMessage.contextInfo.stanzaId)
                    reply("*He is using* _Whatsapp " + deviceq + " version_")
                    break
                }
                default:
                    break
            }
        } catch (e) {
            console.error(e)
        }
    })
}

app.get("/", (req, res) => {
    res.send("📟 Working successfully!");
});

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
    connectToWA()
}, 3000);
