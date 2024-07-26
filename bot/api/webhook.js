// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test'

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)

// bot.setWebHook(`${process.env.BOT_WEBHOOK_DOMAIN}/api/webhook`)

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
  console.log('Request received')
  try {
    // Retrieve the POST request body that gets sent from Telegram
    const { body } = request

    // Ensure that this is a message being sent
    if (body.message) {
      // Retrieve the ID for this chat
      // and the text that the user sent
      const {
        chat: { id },
        text,
      } = body.message

      if (text === '/start' || text.includes('start tapps')) {
        const message = `
Hi there! 👋

Welcome to PodTune – your new best friend in the world of podcasts. 🎧

With PodTune, you can easily discover, subscribe to, and listen to your favorite podcasts. Everything you need for a great listening experience is right at your fingertips.

Let's start your podcast journey! 🚀

📬 Support: https://t.me/m/liL26q23YzFi
`
        await bot.sendMessage(id, message, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Listen to Podcasts',
                  web_app: {
                    url: 'https://gramcast-app.vercel.app?',
                  },
                },
              ],
            ],
          },
        })
      }
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error('Error sending message')
    console.log(error.toString())
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  response.send('OK')
}
