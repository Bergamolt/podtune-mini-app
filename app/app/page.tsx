import { TopShows } from '@/app/containers/TopShows'
import { Favorites } from '@/app/containers/Favorites'
import { ContinueListening } from './containers/ContinueListening'
import { Search } from './containers/Search'

export default function Home() {
  return (
    <>
      <Search />
      <ContinueListening />
      <Favorites />
      <TopShows />
    </>
  )
}
