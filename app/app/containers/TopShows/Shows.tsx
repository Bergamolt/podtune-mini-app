import Link from 'next/link'
import { getTopShows } from './utils/getTopShows'

export async function Shows() {
  const podcasts = await getTopShows()

  return podcasts.map((podcast) => (
    <Link key={podcast.itunesId} href={`/podcast/${podcast.itunesId}`}>
      <img
        src={podcast.image}
        alt={podcast.title}
        className='object-cover rounded-md mx-auto w-full h-full'
      />
    </Link>
  ))
}
