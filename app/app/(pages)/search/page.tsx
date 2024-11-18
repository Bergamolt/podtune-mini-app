import { Search } from '@/app/containers/Search'
import { TopShows } from '@/app/containers/TopShows'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { Headline, Text } from '@telegram-apps/telegram-ui'
import Link from 'next/link'

type SearchParams = Promise<{
  query: string
}>

type SearchPageProps = {
  searchParams: SearchParams
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams
  const data = query
    ? await podcastIndex.searchByTerm(decodeURI(query))
    : { feeds: [] }

  return (
    <div className='w-full'>
      <Search initialQuery={query} autoFocus />

      {query ? (
        <div className='p-4'>
          {data.feeds.length > 0 && (
            <div className='flex flex-row'>
              <Headline className='text-2xl font-bold'>
                Search results for: {query}
              </Headline>
            </div>
          )}

          {data.feeds.length === 0 && query && (
            <div className='flex flex-col'>
              <Text className='text-center !my-2'>No podcasts found</Text>
            </div>
          )}

          <div className='grid grid-cols-3 gap-2 w-full max-w-screen-lg mx-auto mt-4'>
            {data.feeds.map((podcast: any) => (
              <Link key={podcast.id} href={`/podcast/${podcast.id}`}>
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className='object-cover rounded-md mx-auto w-full h-full'
                />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <TopShows />
      )}
    </div>
  )
}
