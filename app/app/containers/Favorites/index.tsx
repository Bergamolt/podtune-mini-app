'use client'

import Link from 'next/link'
import { Button, Headline, Text } from '@telegram-apps/telegram-ui'
import { useFavoritePodcasts } from '@/app/store/useFavoritePodcasts'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/app/constants/routes'

export function Favorites() {
  const favorites = useFavoritePodcasts((state) => state.favorites)
  const router = useRouter()

  const goToSearch = () => {
    router.push(ROUTES.SEARCH)
  }

  return (
    <section className='p-4 pb-0 w-full'>
      <Headline weight='2'>Favorites</Headline>

      {!favorites.length && (
        <div className='flex flex-col'>
          <Text className='text-center !my-2'>
            Folow some podcasts and they&apos;ll appear <br /> here for easy
            access!
          </Text>
          <Button onClick={goToSearch} className='!w-auto' size='s'>
            Find a podcast
          </Button>
        </div>
      )}

      <div className='grid grid-cols-3 gap-2 w-full max-w-screen-lg mx-auto mt-4'>
        {favorites.map((podcast) => (
          <Link key={podcast.id} href={`/podcast/${podcast.id}`} scroll={false}>
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
