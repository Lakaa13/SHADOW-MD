const { cmd, commands } = require('../command');
const scraper = require("../lib/scraper");
const xnxx = require("xnxx-dl");
const axios = require('axios');
const fetch = require('node-fetch');
const { fetchJson, getBuffer } = require('../lib/functions');
const path = require('path');
const fs = require('fs');

// Load premium groups from a file or define it in-memory
let premiumGroups = [];
const premiumFilePath = path.resolve(__dirname, 'premiumGroups.json');

// Function to load premium groups from file
const loadPremiumGroups = () => {
    if (fs.existsSync(premiumFilePath)) {
        premiumGroups = JSON.parse(fs.readFileSync(premiumFilePath));
    }
};

// Function to save premium groups to file
const savePremiumGroups = () => {
    fs.writeFileSync(premiumFilePath, JSON.stringify(premiumGroups));
};

loadPremiumGroups();

cmd({
    pattern: "xnxx",
    desc: "Downloads a video from XNXX",
    use: ".xnxx <search_term>",
    react: "📥",
    category: "premium",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply }) => {
    // Only allow premium groups to access this command
    if (!premiumGroups.includes(from)) {
        return reply("This command is available in premium groups only.");
    }

    const searchTerm = q.trim();
    if (!searchTerm) return reply(`Please provide a search term`);

    reply(`Searching For Your Video...`);
    try {
        // Search for the video and download
        const videoInfo = await xnxx.download(searchTerm);
        if (!videoInfo || !videoInfo.link_dl) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        reply(`Downloading video...`);
        const videoUrl = videoInfo.link_dl;
        await conn.sendMessage(
            from,
            { video: { url: videoUrl }, caption: '*SHADOW-MD➤*', mimetype: 'video/mp4' }, 
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});

// Command to add a group to the premium list
cmd({
    pattern: "premium",
    desc: "Add this group to the premium list",
    use: ".premium",
    react: "⭐",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply, participants }) => {
    const groupAdmins = participants.filter(p => p.isAdmin).map(p => p.jid);
    const isAdmin = groupAdmins.includes(m.sender);

    if (!isAdmin) {
        return reply("Only admins can add premium groups.\nContact Owner +94758900210");
    }

    if (!premiumGroups.includes(from)) {
        premiumGroups.push(from);
        savePremiumGroups();
        reply("This group has been added to the premium list.");
    } else {
        reply("This group is already in the premium list.");
    }
});

// Command to remove a group from the premium list
cmd({
    pattern: "removepremium",
    desc: "Remove this group from the premium list",
    use: ".removepremium",
    react: "❌",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply, participants }) => {
    const groupAdmins = participants.filter(p => p.isAdmin).map(p => p.jid);
    const isAdmin = groupAdmins.includes(m.sender);

    if (!isAdmin) {
        return reply("Only admins can remove premium groups.");
    }

    const index = premiumGroups.indexOf(from);
    if (index > -1) {
        premiumGroups.splice(index, 1);
        savePremiumGroups();
        reply("This group has been removed from the premium list.");
    } else {
        reply("This group is not in the premium list.");
    }
});

// Command to check if a group is premium
cmd({
    pattern: "ispremium",
    desc: "Check if this group is a premium group",
    use: ".ispremium",
    react: "🔍",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply }) => {
    if (premiumGroups.includes(from)) {
        reply("This group is a premium group.");
    } else {
        reply("This group is not a premium group.");
    }
});

module.exports = {
    premiumGroups
};
