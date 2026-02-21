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






require('./settings')

const {
  default: TristanMakerincConnect,
  useSingleFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto
} = require('@adiwajshing/baileys')

const { state, saveState } = useSingleFileAuthState('./' + sessionName + '.json')

const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')

const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require('./lib/exif')

const {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  sleep
} = require('./lib/myfunc')

let low
try {
  low = require('lowdb')
} catch {
  low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
)

global.db = new Low(
  /https?:\/\//.test(opts.db || '')
    ? new cloudDBAdapter(opts.db)
    : /mongodb/.test(opts.db)
    ? new mongoDB(opts.db)
    : new JSONFile('./database/database.json')
)

global.db.data = {
  users: {},
  chats: {},
  database: {},
  game: {},
  settings: {},
  others: {},
  sticker: {},
  ...(global.db.data || {})
}

if (global.db) {
  setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30000)
}

const store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' })
})

async function startElisaBotMd() {
  const conn = DarkMakerincConnect({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['Elisa Bot', 'Safari', '1.0.0'],
    auth: state
  })

  store.bind(conn.ev)

  conn.ev.on('creds.update', saveState)

  conn.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0]
      if (!mek.message) return

      mek.message =
        Object.keys(mek.message)[0] === 'ephemeralMessage'
          ? mek.message.ephemeralMessage.message
          : mek.message

      if (mek.key && mek.key.remoteJid === 'status@broadcast') return
      if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return

      if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return

      const m = smsg(conn, mek, store)

      require('./ElisaBot')(conn, m, chatUpdate, store)

    } catch (err) {
      console.log(err)
    }
  })

  conn.ev.on('group-participants.update', async (anu) => {
    try {
      let metadata = await conn.groupMetadata(anu.id)
      let participants = anu.participants

      for (let num of participants) {
        let ppuser
        try {
          ppuser = await conn.profilePictureUrl(num, 'image')
        } catch {
          ppuser = 'https://i.ibb.co/6BRf7qQ/default.jpg'
        }

        if (anu.action === 'add') {
          let buffer = await getBuffer(ppuser)

          conn.sendMessage(anu.id, {
            document: fs.readFileSync('./lib/thumb.jpg'),
            mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            jpegThumbnail: buffer,
            mentions: [num],
            fileName: `WELCOME ${metadata.subject}`,
            caption:
              `👋 Welcome @${num.split('@')[0]}\n\n` +
              `${metadata.subject}\n\n` +
              global.welcome,
            footer: 'ELISA BOT',
            buttons: [
              {
                buttonId: 'welcome',
                buttonText: { displayText: 'WELCOME' },
                type: 1
              }
            ],
            headerType: 4
          })
        }

        if (anu.action === 'remove') {
          conn.sendMessage(anu.id, {
            text: `👋 Goodbye @${num.split('@')[0]}`,
            mentions: [num]
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  })

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'close') {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode

      if (reason === DisconnectReason.badSession) {
        console.log('Bad Session File, Delete Session and Scan Again')
        process.exit()
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log('Connection closed, reconnecting...')
        startElisaBotMd()
      } else if (reason === DisconnectReason.connectionLost) {
        console.log('Connection lost, reconnecting...')
        startElisaBotMd()
      } else if (reason === DisconnectReason.loggedOut) {
        console.log('Device Logged Out, Please Scan Again')
        process.exit()
      } else {
        console.log('Unknown Disconnect, reconnecting...')
        startElisaBotMd()
      }
    }

    if (connection === 'open') {
      console.log('✅ BOT CONNECTED')
    }
  })
}

startElisaBotMd()
