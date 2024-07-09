'use client'

import { AppRoot } from '@telegram-apps/telegram-ui'
import { ReactNode } from 'react'
import { useInitStore } from './store/useStore'

type TelegramUIProps = {
  children: ReactNode
}

export function TelegramUI({ children }: TelegramUIProps) {
  useInitStore()

  return <AppRoot className='flex flex-col h-full'>{children}</AppRoot>
}
