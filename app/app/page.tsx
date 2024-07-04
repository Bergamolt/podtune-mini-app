import { TopShows } from '@/app/containers/TopShows'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <TopShows />
    </main>
  )
}
