import { TopShows } from '@/app/containers/TopShows'
import { Favorites } from '@/app/containers/Favorites'
import { ContinueListening } from './containers/ContinueListening'
import { SearchButton } from '@/app/components/SearchButton'
import { SayHi } from '@/app/components/SayHi'

export default function Home() {
  return (
    <>
      <div className='flex pb-4'>
        <SayHi />
        <SearchButton />
      </div>
      <ContinueListening />
      <Favorites />
      <TopShows />
    </>
  )
}
