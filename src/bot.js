const TelegramBot = require('node-telegram-bot-api')
const { help } = require('./HTMLReplies.js')
const { convert } = require('./requests')
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

bot.onText(/\/convert (.+)/, (msg, [source, match]) => {
  const isInDefinitions =
    Object.keys(Defenitions).indexOf(match.toUpperCase()) !== -1

  bot.sendMessage('In Defenitions', isInDefinitions)

  if (match === undefined) {
    bot.sendMessage(msg.chat.id, 'Get some help\n/help')
  } else if (isInDefinitions) {
    convert(match.toUpperCase()).then((res) => {
      bot.sendMessage(
        msg.chat.id,
        `1 USD equals 
        <b>${res}</b> ${Defenitions[match.toUpperCase()]}`,
        { parse_mode: 'HTML' }
      )
    })
  } else {
    bot.sendMessage(msg.chat.id, 'You currency value not found. Try another')
  }
})

bot.onText(/\c (.+)/, (msg, arr) => {
  bot.sendMessage(msg.chat.id, 'arr ' + arr)
})
