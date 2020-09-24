require('dotenv').config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(async (ctx, next) => {
    ctx.reply('Mddleware')
    // ctx.state.isSend = true
    // ctx.state.user = 'Test'

    // throw 'some error'

    await next(ctx)
})

bot.catch((err, ctx) => {
    console.log('ERROR', err)
})

// commands
bot.start((ctx) => {
    const {state} = ctx
    console.log(state)
    return ctx.reply(`Start command ${state.isSend}`)
})
bot.help(ctx => ctx.reply('Help command'))
bot.settings(ctx => ctx.reply('Settings'))
// command method
bot.command(['stop', 'finish'], ctx => {
    return ctx.reply('Stop comand')
})

bot.mention('botfather', (ctx) => {
    ctx.reply('botfather mention')
})

bot.phone('+380676029700', (ctx) => {
    ctx.reply('phone number')
})

bot.hashtag('bot', (ctx) => {
    ctx.reply('bot hashtag')
})
// context test
bot.command('ctx', (ctx) => {
    console.log(ctx.update)
    ctx.reply(`${ctx.update.message.from.first_name}, hello`)
})

bot.hears('dog', ctx => {
    ctx.reply('who lets the dog out')
})

bot.on(['message', 'edited_message'], ctx => {
    console.log(ctx.updateType)
    console.log(ctx.updateSubTypes)
})
bot.launch().then(res => {
    console.log('Start')
}).catch((err) => {
    console.log(err)
})
