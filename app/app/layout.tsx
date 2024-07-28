import type { Metadata } from 'next'
import { TelegramProvider } from './TelegramProvider'
import { Analytics } from '@vercel/analytics/react'
import '@telegram-apps/telegram-ui/dist/styles.css'
import '@/app/globals.css'
import ScrollLock from '@/app/ScrollLock'
import { TelegramUI } from '@/app/TelegramUI'
import { PlayerProvider } from '@/app/context/player'

export const metadata: Metadata = {
  title: 'PodTune: Podcast Player',
  description: 'PodTune is a podcast player for Telegram',
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
            <PlayerProvider>
              <main className='root overflow-y-auto'>{children}</main>
            </PlayerProvider>
          </TelegramUI>
        </TelegramProvider>
        <ScrollLock />

        <Analytics debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  )
}
