import Link from 'next/link'
import { PodcastsTrendingResponse } from '@/app/types'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { Headline } from '@telegram-apps/telegram-ui'

export async function TopShows() {
  const data: PodcastsTrendingResponse = await podcastIndex.podcastsTrending(
    12,
    null,
    'uk'
  )

  return (
    <section className='p-4'>
      <Headline weight='2'>Top Shows</Headline>
      <div className='grid grid-cols-3 gap-2 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-screen-lg mx-auto mt-4'>
        {data.feeds.map((feed) => (
          <Link key={feed.id} href={`/podcast/${feed.id}`}>
            <img
              src={feed.image}
              alt={feed.title}
              className='object-cover rounded-md mx-auto w-full h-full'
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
