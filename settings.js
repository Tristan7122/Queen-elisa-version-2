/*
 █▀▀█   █░▒█   █▀▀▀   █▀▀▀   █▄░▒█                 █▀▀▀   █░░░   ▀█▀   █▀▀▀█   █▀▀█           
 █░▒█   █░▒█   █▀▀▀   █▀▀▀   █▒█▒█                 █▀▀▀   █░░░   ░█░   ▀▀▀▄▄   █▄▄█             
 ▀▀█▄   ▀▄▄▀   █▄▄▄   █▄▄▄   █░░▀█                 █▄▄▄   █▄▄█   ▄█▄   █▄▄▄█   █░▒█         

 
   QUEEN ELISA WHATSAPP BOT 2026
   
 CREATED BY TRISTAN
 BASE BOT - TUNA
 HELPERS - SL REAL TECH , THASHI , THINURA , THISAL
 
 💞 THANKS FOR USEING ELISA 


*/
const fs = require("fs")
const chalk = require("chalk")

/* ================== BASIC INFO ================== */

global.sessionName = process.env.SESSION || "session"
global.botName = process.env.BOT_NAME || "QUEEN 𝐄𝐋𝐈𝐒𝐀 𝐁𝐎𝐓"
global.ownerName = process.env.OWNER_NAME || "Tristan"
global.packname = process.env.PACK_NAME || "Tuesday"
global.author = process.env.AUTHOR || "Tristan ᴍᴀᴋᴇʀ"

global.prefa = ["#", "!", "/", ""]
global.sp = "🔵"

global.owner = [
  process.env.OWNER_NUMBER || "27634624586"
]

global.premium = [
  "27634624586",
  "",
  ""
]

/* ================== API CONFIG ================== */

global.APIs = {
  zenz: "https://zenzapi.xyz"
}

global.APIKeys = {
  "https://zenzapi.xyz": "c9e0a07636"
}

global.fbapi = process.env.EXTRA_API || "21a3"

/* ================== FEATURES ================== */

global.autoBio = process.env.AUTO_BIO || "off"
global.antiLink = process.env.ANTI_LINK || "true"
global.antiBadWord = process.env.ANTI_BADWORD || "false"
global.blockCall = process.env.BLOCK_CALLERS || "false"
global.sendWelcome = process.env.SEND_WELCOME || "true"
global.voiceReply = process.env.VOICE_REPLY || "true"

/* ================== RPG / LIMIT ================== */

global.limitawal = {
  premium: "Infinity",
  free: 100
}

global.rpg = {
  darahawal: 100,
  besiawal: 15,
  goldawal: 10,
  emeraldawal: 5,
  umpanawal: 5,
  potionawal: 1
}

/* ================== MESSAGES ================== */

global.mess = {
  success: "✅ Done!",
  admin: "You must be admin to use this command!",
  botAdmin: "Bot must be admin first!",
  owner: "This command is only for the owner!",
  group: "This feature is for groups only!",
  private: "This feature is for private chat only!",
  wait: "Wait, bot is processing...",
  endLimit: "Your daily limit has expired, reset in 12 hours."
}

/* ================== LINKS ================== */

global.youtube = "https://youtube.com/"
global.github = "https://github.com/"
global.telegra = "https://telegra.ph/"

/* ================== MEDIA ================== */

global.thumb = fs.readFileSync("./image/Elisa.jpg")
global.imgalive = fs.readFileSync("./image/alive.jpg")

/* ================== HOT RELOAD ================== */

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update '${__filename}'`))
  delete require.cache[file]
  require(file)
})
