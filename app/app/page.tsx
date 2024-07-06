import { TopShows } from '@/app/containers/TopShows'
import { Favorites } from '@/app/containers/Favorites'
import { ContinueListening } from './containers/ContinueListening'

export default function Home() {
  return (
    <>
      <ContinueListening />
      <Favorites />
      <TopShows />
    </>
  )
}
