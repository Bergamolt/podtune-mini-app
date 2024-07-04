'use client'

import Link from 'next/link'
import { Headline } from '@telegram-apps/telegram-ui'
import { useFavoritePodcasts } from '@/app/store/useFavoritePodcasts'

export function Favorites() {
  const favorites = useFavoritePodcasts((state) => state.favorites)

  return (
    <section className='p-4 w-full'>
      <Headline weight='2'>Favorites</Headline>

      <div className='grid grid-cols-3 gap-2 w-full max-w-screen-lg mx-auto mt-4'>
        {favorites.map((podcast) => (
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
