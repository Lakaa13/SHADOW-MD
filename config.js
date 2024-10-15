const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'put id' : process.env.SESSION_ID,
BTN: "FOLLOW US :)",
FOOTER: "*ꜱʜᴀᴅᴏᴡ-ᴍᴅ-ᴠᴇʀꜱɪᴏɴ 6➤*",
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'true' : process.env.ONLY_GROUP,
MAX_SIZE: 200,

};
