// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test'

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
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
        const message =
          '👋🏻 Hello! This is first podcast player in Telegram \n🎧 You can listen to podcasts without \nleaving the app \n Just click on the button below to start listening to your favorite podcast 🎙️'
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
