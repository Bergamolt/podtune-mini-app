import type { Metadata } from 'next'
import { TelegramProvider } from './TelegramProvider'
import { Analytics } from '@vercel/analytics/react'
import '@telegram-apps/telegram-ui/dist/styles.css'
import './globals.css'
import { Player } from './containers/Player'
import ScrollLock from './ScrollLock'
import { TelegramUI } from './TelegramUI'

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
      <body data-dev={process.env.NODE_ENV === 'development'}>
        <TelegramProvider>
          <TelegramUI>
            <main className='root overflow-y-auto'>{children}</main>
            <Player />
          </TelegramUI>
        </TelegramProvider>
        <ScrollLock />

        <Analytics debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  )
}
