'use client'

import { useFavoritePodcasts } from '@/app/store/useFavoritePodcasts'
import { Button } from '@telegram-apps/telegram-ui'

type FavoriteProps = {
  id: string
  title: string
  image: string
  author: string
}

export function Favorite({ id, title, image, author }: FavoriteProps) {
  const favorites = useFavoritePodcasts((state) => state.favorites)
  const setFavorites = useFavoritePodcasts((state) => state.setFavorites)
  const isFavorite = favorites.some((p) => p.id === id)

  const handleFavorite = () => {
    setFavorites({ id, title, image, author })
  }

  return (
    <Button
      size='s'
      onClick={handleFavorite}
      className='w-auto mt-2 !max-w-[60%]'
    >
      {isFavorite ? 'Following' : 'Follow'}
    </Button>
  )
}
