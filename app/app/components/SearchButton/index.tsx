'use client'

import { ROUTES } from '@/app/constants/routes'
import { useRouter } from 'next/navigation'
import { IoSearch } from 'react-icons/io5'

export function SearchButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push(ROUTES.SEARCH)
  }

  return (
    <button
      onClick={handleClick}
      className='inline-flex items-center ml-auto w-auto  px-4'
    >
      <IoSearch size={18} />
    </button>
  )
}
