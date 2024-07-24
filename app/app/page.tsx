import { TopShows } from '@/app/containers/TopShows'
import { Favorites } from '@/app/containers/Favorites'
import { ContinueListening } from './containers/ContinueListening'
import { SearchButton } from './components/SearchButton'

export default function Home() {
  return (
    <>
      <SearchButton />
      <ContinueListening />
      <Favorites />
      <TopShows />
    </>
  )
}
