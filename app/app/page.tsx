import { TopShows } from '@/app/containers/TopShows'
import { Favorites } from '@/app/containers/Favorites'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify'>
      <Favorites />
      <TopShows />
    </main>
  )
}
