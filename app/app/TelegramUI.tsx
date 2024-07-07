'use client'

import { AppRoot } from '@telegram-apps/telegram-ui'
import { ReactNode } from 'react'

type TelegramUIProps = {
  children: ReactNode
}

export function TelegramUI({ children }: TelegramUIProps) {
  return <AppRoot className='flex flex-col h-full'>{children}</AppRoot>
}
