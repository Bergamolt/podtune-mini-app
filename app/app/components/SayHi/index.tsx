'use client'

import { Caption } from '@telegram-apps/telegram-ui'
import { useTelegram } from '@/app/TelegramProvider'

export function SayHi() {
  const { user } = useTelegram()

  return (
    <div className='inline-flex items-center px-4'>
      <Caption className='mr-2'>Hi, {user?.first_name} 👋</Caption>
    </div>
  )
}
