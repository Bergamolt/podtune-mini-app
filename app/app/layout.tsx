import type { Metadata } from 'next'
import { TelegramProvider } from './TelegramProvider'
import { AppRoot } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css'
import './globals.css'
import { Player } from './containers/Player'
import ScrollLock from './ScrollLock'

export const metadata: Metadata = {
  title: 'Gramcast: Podcast Player',
  description: 'Gramcast is a podcast player for Telegram Web Apps',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRoot className='flex flex-col h-full'>
          <TelegramProvider>
            <main className='root overflow-y-auto'>{children}</main>
            <Player />
          </TelegramProvider>
        </AppRoot>
        <ScrollLock />
      </body>
    </html>
  )
}
