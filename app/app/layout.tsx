import type { Metadata } from 'next'
import { TelegramProvider } from './TelegramProvider'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { Analytics } from '@vercel/analytics/react'
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
      <body data-dev={process.env.NODE_ENV === 'development'}>
        <TelegramProvider>
          <AppRoot className='flex flex-col h-full'>
            <main className='root overflow-y-auto'>{children}</main>
            <Player />
          </AppRoot>
        </TelegramProvider>
        <ScrollLock />

        <Analytics debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  )
}
