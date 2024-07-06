import { podcastIndex } from '@/app/utils/podcastIndex'
import { Headline } from '@telegram-apps/telegram-ui'
import Link from 'next/link'

type SearchPageProps = {
  searchParams: {
    query: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const data = await podcastIndex.searchByTerm(searchParams.query)

  return (
    <section className='p-4 pb-0 w-full'>
      {/* {!data.length && (
        <div className='flex flex-col'>
          <Text className='text-center !my-2'>
            Folow some podcasts and they&apos;ll appear <br /> here for easy
            access!
          </Text>
          <Button onClick={goToSearch} className='!w-auto' size='s'>
            Find a podcast
          </Button>
        </div>
      )} */}

      <div className='flex flex-row'>
        <Headline className='text-2xl font-bold'>
          Search results for {searchParams.query}
        </Headline>
      </div>

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
    </section>
  )
}
