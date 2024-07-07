'use client'

import { ROUTES } from '@/app/constants/routes'
import { Input } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

type SearchProps = {
  initialQuery?: string
}

export function Search({ initialQuery = '' }: SearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

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
    <div className='p-4'>
      <Input
        value={query}
        onChange={onChange}
        placeholder='Search for podcasts'
        before={<IoSearch />}
      />
    </div>
  )
}
