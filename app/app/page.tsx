import Link from 'next/link'
import { PodcastsTrendingResponse } from './types'
import { podcastIndex } from './utils/podcastIndex'

export default async function Home() {
  const data: PodcastsTrendingResponse = await podcastIndex.podcastsTrending(
    12,
    null,
    'uk'
  )

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      {/* card list */}
      <section
        className='grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-3
        p-4 w-full max-w-screen-lg mx-auto mt-8
      '
      >
        {data.feeds.map((feed) => (
          <Link
            key={feed.id}
            href={`/podcast/${feed.id}`}
            className='bg-white shadow-sm rounded-md'
          >
            <img
              src={feed.image}
              alt={feed.title}
              className='object-cover rounded-md max-h-48 mx-auto'
            />
          </Link>
        ))}
      </section>
    </main>
  )
}
