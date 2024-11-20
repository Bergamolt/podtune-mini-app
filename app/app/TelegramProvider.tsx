'use client'

import { usePathname, useRouter } from 'next/navigation'
import Script from 'next/script'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react'
import { TelegramWebApps } from 'telegram-webapps'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Telegram: {
      WebApp: TelegramWebApps.WebApp
    }
  }
}

export interface ITelegramContext {
  user: TelegramWebApps.WebAppUser
  webApp?: TelegramWebApps.WebApp
}

// @ts-ignore
export const TelegramContext = createContext<ITelegramContext>({})

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [webApp, setWebApp] = useState<TelegramWebApps.WebApp | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!webApp) {
      return undefined
    }

    if (pathname !== '/') {
      webApp.BackButton.onClick(router.back)
      webApp.BackButton.show()
    } else {
      webApp.BackButton.hide()
    }
  }, [pathname, router, webApp])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user:
            process.env.NODE_ENV !== 'development'
              ? webApp.initDataUnsafe.user
              : { id: 1, name: 'Test User', username: 'test_user' },
        }
      : {
          user: undefined,
          webApp: undefined,
        }
  }, [webApp])

  return (
    // @ts-ignore
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      <Script
        src='https://telegram.org/js/telegram-web-app.js'
        onLoad={() => {
          if (typeof window !== 'undefined' && window.Telegram) {
            const app = window.Telegram.WebApp

            app.expand()
            // @ts-ignore
            app.requestFullscreen()
            app.disableVerticalSwipes()
            setWebApp(app)
            app.ready()
          }
        }}
      />
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
