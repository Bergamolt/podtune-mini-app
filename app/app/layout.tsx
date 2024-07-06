import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { TelegramProvider } from './TelegramProvider'
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
          <AppRoot className='root overflow-y-auto'>{children}</AppRoot>
          <Player />
        </TelegramProvider>
        <ScrollLock />
      </body>
    </html>
  )
}
