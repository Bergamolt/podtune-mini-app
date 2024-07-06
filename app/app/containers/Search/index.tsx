'use client'

import { ROUTES } from '@/app/constants/routes'
import { Input } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

export function Search() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const input = document.querySelector('input')

    if (input) {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && query.trim()) {
          router.push(ROUTES.SEARCH + '?query=' + query)
        }
      })
    }
  })

  return (
    <Input
      value={query}
      onChange={onChange}
      placeholder='Search for podcasts'
      className='w-full'
      before={<IoSearch />}
    />
  )
}
