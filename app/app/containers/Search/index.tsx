'use client'

import { ROUTES } from '@/app/constants/routes'
import { Input } from '@telegram-apps/telegram-ui'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { IoSearch } from 'react-icons/io5'

type SearchProps = {
  initialQuery?: string
  autoFocus?: boolean
}

export function Search({ initialQuery = '', autoFocus }: SearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const pathname = usePathname()

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
          // If the user is already on the search page, replace the query
          router[pathname.includes(ROUTES.SEARCH) ? 'replace' : 'push'](
            ROUTES.SEARCH + '?query=' + query
          )
        }
      })
    }
  })

  return (
    <div className='px-4'>
      <Input
        value={query}
        onChange={onChange}
        placeholder='Search for podcasts'
        // before={<IoSearch />}
        autoFocus={autoFocus && initialQuery === ''}
      />
    </div>
  )
}
