import { TopShows } from '@/app/containers/TopShows'
import { Favorites } from '@/app/containers/Favorites'

export default function Home() {
  return (
    <>
      <Favorites />
      <TopShows />
    </>
  )
}
