const TelegramBot = require('node-telegram-bot-api')
const { help } = require('./HTMLReplies.js')
const { convert } = require('./requests')
const mock = require('../mock')
const { Defenitions } = require('../Defenitions.js')
require('dotenv').config()

const bot = new TelegramBot(process.env.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
})

bot.onText(/\help/, (msg) => {
  bot.sendMessage(msg.chat.id, help, { parse_mode: 'HTML' })
})

bot.onText(/\hello (.+)/, (msg, [source, match]) => {
  const isInDefinitions =
    Object.keys(Defenitions).indexOf(match.toUpperCase()) !== -1

  bot.sendMessage(msg.chat.id, `in defs ${isInDefinitions}, match: ${match}`)
  bot.sendMessage('In Defenitions', isInDefinitions)

  if (!match) {
    bot.sendMessage(
      msg.chat.id,
      'Please, send correct commands.\nNeed help? /help'
    )
  }

  if (isInDefinitions) {
    convert(match.toUpperCase()).then((res) => {
      bot.sendMessage(
        msg.chat.id,
        `1 ${Defenitions[match.toUpperCase()]} equals 
        <b>${res}</b> USD`,
        { parse_mode: 'HTML' }
      )
    })
  } else {
    bot.sendMessage(msg.chat.id, 'You currency value not found. Try another')
  }
})
