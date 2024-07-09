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
  interface Window {
    Telegram: {
      WebApp: TelegramWebApps.WebApp
    }
  }
}

export interface ITelegramContext {
  webApp?: TelegramWebApps.WebApp
  user: TelegramWebApps.WebAppUser
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
          user: webApp.initDataUnsafe.user,
        }
      : {
          user: undefined,
          webApp: undefined,
          unsafeData: undefined,
        }
  }, [webApp])

  return (
    // @ts-ignore
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      <Script
        src='https://telegram.org/js/telegram-web-app.js'
        onLoad={() => {
          if (typeof window !== 'undefined') {
            const app = window.Telegram.WebApp

            app.ready()
            app.expand()
            app.showAlert('Hello from Telegram Web App!')
            setWebApp(app)
          }
        }}
      />
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
