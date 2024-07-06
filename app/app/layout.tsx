import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TelegramProvider } from './TelegramProvider'
import { AppRoot } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css'
import './globals.css'
import { Player } from './containers/Player'
import ScrollLock from './ScrollLock'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <TelegramProvider>
          <AppRoot>
            <main className='root overflow-y-auto'>{children}</main>
            <Player />
          </AppRoot>
        </TelegramProvider>
        <ScrollLock />
      </body>
    </html>
  )
}
