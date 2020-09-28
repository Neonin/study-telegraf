require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
    ctx.reply('Hello! Its echo bot!')
})

bot.help(ctx => {
    ctx.reply('Send any message and I will copy it')
})

bot.on('message', ctx => {
    ctx.telegram.sendCopy(ctx.chat.id, ctx.message)
})

bot.launch().then((res) => {
    console.log('run')
}).catch(err => {
    console.log(err)
})
