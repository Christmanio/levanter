const { Sequelize } = require('sequelize')
const { existsSync } = require('fs')
const path = require('path')
const configPath = path.join(__dirname, './config.env')
const databasePath = path.join(__dirname, './database.db')
if (existsSync(configPath)) require('dotenv').config({ path: configPath })
const toBool = (x) => x == 'true'
const DATABASE_URL =
process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL
module.exports = {
  VERSION: require('./package.json').version,
  SESSION_ID: eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktMK0dMc1h1WHN0T0NseEpsKzRCQVVGV0lkT0tRaWp1RlZmM2FMZHFXbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1ZGN1A0M1R0QUsxNmMzMWxBSjNXN1pRSXlwWFhjSmF2clhPMzY5S2VDTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSEhETWlDdHExYVZFWFZ4eW5aTGgzUzhKalJlejZ1MUJzTHc4ZW40ejM0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0aGdFM3U1S0ROZ2VOTnNRMnVpa3lRRjRwZGo0ZVhVcHk2cUZhZE55bEhnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPL2piRU9hTER6TFFIS1owS2hTR0FndWxTOHNwTTh1UDNPWHd6bWpZMTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBzV256NmhCWFB6V0hEa2p6SzU3eHpzN0lXZVJ1cVZ5bWV1UElTRnNIbEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlCNlNIeGZqTnJxVDZWUnFFQVhVTHVkcDBCNHJXN2JXZXBNQ1AyVXIxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUxCb2k0RDFlK1dWVTIzMmE3NjVlaTVTRDAvNnR3V2QxWC9IRVVBS3czWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlNT2NZRnhZOHBiY3N3R0d4TlMzUjNEVFd5K21WSC9TQnZZUXJyamoxU2RXNHFsM2U4akE1dHRzckdwcE5wa2pFVG90cU5oQXJxQWU2bUxDbitHK2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJqRldpQm9JTHh4S2xnald6UVZQVDJGVGx5SVVOMVlRc1BWUEZGaU55OHdnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTMzOTA0MTc4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFCMTNCOENGQTM1MDQ1NTUyOEM2RDE4NDEyODAxQjIzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzI2Njg2NjR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTMzOTA0MTc4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY5MkQ1RkUzRDdFRjgyNUMxNDNBNzgwQzNFOTk4RTUyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzI2Njg2NjR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1rNjRnWjJSU1R5MjBTWjNzUmRFREEiLCJwaG9uZUlkIjoiYTU5YjQ5NTQtN2M5My00NWEzLWE4NTMtYmZlYTIzZDY1YzUyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InloaVAyOWREd1pjK1FHbzg2c2l0c0MzWllDVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEVWVKRzBpT0w4a04vOXd0TkNPYUExM3gvdHc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTFdEQzFWUDIiLCJtZSI6eyJpZCI6IjUwOTMzOTA0MTc4OjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiY2hyc3RtYW5pbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHorOE80R0VPTFptYm9HR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYkNSTWk5cjNJSk5sdGRjR2NIZEIvVW9vQ2NqM0pIQld6Umh6TWZ6UEZCYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZHpuRWFJcUsrNHVwUUZienJkRXpQanJUOHlkMlc3aDRGOHh3bEVpYjJuOFUzZDExd1ZKRGxZYmFSSWF4K3l1U01tbGZ5MFJmOW02WkhQTVFVU0VQQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IjJ2bUdqS3lYYkp4OTJRVWhuTGNHcmZORitjZGVuSWM3VFEyeGU0R3BNY2VyQzZCT2xYcVZVbVZZY1AyUXhEUXA5S0xUc012YXFRZTdOQWdFRURnM2dnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzM5MDQxNzg6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXd2tUSXZhOXlDVFpiWFhCbkIzUWYxS0tBbkk5eVJ3VnMwWWN6SDh6eFFYIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyNjY4ODQ1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUYzayJ9
  DATABASE:
    DATABASE_URL === databasePath
      ? new Sequelize({
          dialect: 'sqlite',
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: 'postgres',
          ssl: true,
          protocol: 'postgres',
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
  PREFIX: (process.env.PREFIX || '^[.,!]').trim(),
  SUDO: process.env.SUDO || '',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  BRANCH: 'master',
  STICKER_PACKNAME: process.env.STICKER_PACKNAME || '❤️,LyFE',
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE,
  LOG_MSG: process.env.LOG_MSG || 'false',
  RMBG_KEY: process.env.RMBG_KEY || 'null',
  BAILEYS_LOG_LVL: process.env.BAILEYS_LOG_LVL || 'silent',
  LANG: (process.env.LANGUAG || 'en').toLowerCase(),
  WARN_LIMIT: process.env.WARN_LIMIT || 3,
  FORCE_LOGOUT: process.env.FORCE_LOGOUT || 'false',
  BRAINSHOP: process.env.BRAINSHOP || '159501,6pq8dPiYt7PdqHz3',
  DISABLE_BOT: process.env.DISABLE_BOT || 'null',
  ANTILINK_MSG: process.env.ANTILINK_MSG || '_Antilink Detected &mention kicked_',
  ANTISPAM_MSG: process.env.ANTISPAM_MSG || '_Antispam Detected &mention kicked_',
  ANTIWORDS_MSG: process.env.ANTIWORDS_MSG || '_AntiWord Detected &mention kicked_',
  ANTIWORDS: process.env.ANTIWORDS || 'word',
  MENTION: process.env.MENTION || '',
  MAX_UPLOAD: process.env.MAX_UPLOAD || 230,
  REJECT_CALL: process.env.REJECT_CALL,
  VPS: toBool(process.env.VPS),
  AUTO_STATUS_VIEW: (process.env.AUTO_STATUS_VIEW || 'false').trim(),
  SEND_READ: process.env.SEND_READ,
  KOYEB: toBool(process.env.KOYEB),
  KOYEB_NAME: (process.env.KOYEB_NAME || '').trim(),
  KOYEB_API: (process.env.KOYEB_API || '').trim(),
  AJOIN: process.env.AJOIN || 'false',
  GPT: (process.env.GPT || 'free').trim(),
  MODEL: (process.env.MODEL || 'gpt-3.5-turbo').trim(),
  APPROVE: (process.env.APPROVE || '').trim(),
  ANTI_DELETE: (process.env.ANTI_DELETE || 'null').trim(),
  PERSONAL_MESSAGE: (process.env.PERSONAL_MESSAGE || 'null').trim(),
  DISABLE_START_MESSAGE: process.env.DISABLE_START_MESSAGE || 'false',
  ANTI_BOT: (process.env.ANTI_BOT || 'off').trim(),
  ANTI_BOT_MESSAGE: process.env.ANTI_BOT_MESSAGE || '&mention removed',
  WARN_MESSAGE:
    process.env.WARN_MESSAGE ||
    '⚠️WARNING⚠️\n*User :* &mention\n*Warn :* &warn\n*Remaining :* &remaining',
  WARN_RESET_MESSAGE:
    process.env.WARN_RESET_MESSAGE || `WARN RESET\nUser : &mention\nRemaining : &remaining`,
  WARN_KICK_MESSAGE: process.env.WARN_KICK_MESSAGE || '&mention kicked',
  TRUECALLER: process.env.TRUECALLER,
  DELETE_TYPE: (process.env.DELETE_TYPE || '').trim(),
  LIST_TYPE: (process.env.LIST_TYPE || 'text').trim(),
  BING_COOKIE: (process.env.BING_COOKIE || '').trim(),
  GEMINI_API_KEY: (process.env.GEMINI_API_KEY || '').trim(),
  GROUP_ADMINS: process.env.GROUP_ADMINS || '',
  RENDER_NAME: (process.env.RENDER_NAME || '').trim(),
  RENDER_API_KEY: (process.env.RENDER_API_KEY || '').trim(),
  TIMEZONE: process.env.TIMEZONE,
  CMD_REACTION: process.env.CMD_REACTION || 'true',
  AUTO_UPDATE: process.env.AUTO_UPDATE || 'true',
}
