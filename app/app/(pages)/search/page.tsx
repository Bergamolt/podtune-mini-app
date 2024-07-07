import { Search } from '@/app/containers/Search'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { Headline, Text } from '@telegram-apps/telegram-ui'
import Link from 'next/link'

type SearchPageProps = {
  searchParams: {
    query: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const data = searchParams.query
    ? await podcastIndex.searchByTerm(decodeURI(searchParams.query))
    : { feeds: [] }

  return (
    <div className='w-full'>
      <Search initialQuery={searchParams.query} />

      <div className='px-4 pb-4'>
        {data.feeds.length > 0 && (
          <div className='flex flex-row'>
            <Headline className='text-2xl font-bold'>
              Search results for: {searchParams.query}
            </Headline>
          </div>
        )}

        {data.feeds.length === 0 && searchParams.query && (
          <div className='flex flex-col'>
            <Text className='text-center !my-2'>No podcasts found</Text>
          </div>
        )}

        <div className='grid grid-cols-3 gap-2 w-full max-w-screen-lg mx-auto mt-4'>
          {data.feeds.map((podcast: any) => (
            <Link
              key={podcast.id}
              href={`/podcast/${podcast.id}`}
              scroll={false}
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className='object-cover rounded-md mx-auto w-full h-full'
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
