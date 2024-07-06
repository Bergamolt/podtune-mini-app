'use client'

import { useEffect } from 'react'

export default function WindowScrollLock() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollLock = () => {
        window.scrollTo(0, 0)
      }

      window.addEventListener('scroll', scrollLock)

      return () => {
        window.removeEventListener('scroll', scrollLock)
      }
    }
  })

  return null
}
