require('dotenv').config()
const { Telegraf } = require('telegraf')
const axios = require('axios')
const cc = require('currency-codes')

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)


bot.start(ctx => {
    ctx.reply('Welcome to Mono Currency Bot.')
})

bot.hears(/^[A-Z]+$/i, async ctx => {
    const message = ctx.message.text
    const currency = cc.code(message)

    if (!currency) {
        return ctx.reply('Currency didnt found!')
    }
    try {
        const response = await axios.get('https://api.monobank.ua/bank/currency')
        const currentCurrency = response.data.find(c => c.currencyCodeA.toString() === currency.number)

        if (!currentCurrency || !currentCurrency.rateBuy || !currentCurrency.rateSell) {
            return ctx.reply('Currency didnt found in Monobank API!')
        }

        return ctx.replyWithMarkdown(`
    CURRENCY: ${currency.code}
RATE BUY: **${currentCurrency.rateBuy}**
RATE SELL: **${currentCurrency.rateSell}**
        `)
    } catch (err) {
        return ctx.reply(`<pre>${err}</pre>`)
    }


})

bot.startPolling()
