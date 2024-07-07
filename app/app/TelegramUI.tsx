'use client'

import { AppRoot } from '@telegram-apps/telegram-ui'
import { ReactNode } from 'react'

type TelegramUIProps = {
  children: ReactNode
}

export function TelegramUI({ children }: TelegramUIProps) {
  return (
    <div>
      <AppRoot>{children}</AppRoot>
    </div>
  )
}
