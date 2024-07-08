import { TelegramWebApps } from 'telegram-webapps'
import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'

export type FavoritePodcast = {
  id: string
  title: string
  image: string
  author: string
}

type FavoritePodcasts = {
  favorites: FavoritePodcast[]
  setFavorites: (podcast: FavoritePodcast) => void
}

export const useFavoritePodcasts = create(
  persist<FavoritePodcasts>(
    (set, get) => ({
      favorites: [],
      setFavorites: (podcast: FavoritePodcast) => {
        const favorites = get().favorites
        const isFavorite = favorites.some((p) => p.id === podcast.id)

        if (isFavorite) {
          set({ favorites: favorites.filter((p) => p.id !== podcast.id) })
        } else {
          set({ favorites: [...favorites, podcast] })
        }
      },
    }),
    {
      name: 'favorite-podcasts',
      storage: createJSONStorage(() => {
        const telegramStorage = (): StateStorage => {
          return {
            getItem: (key: string) => {
              // @ts-ignore
              return window.Telegram?.WebApp?.CloudStorage.getItem(
                key,
                () => {}
              )
            },
            setItem: (key: string, value: string) => {
              // @ts-ignore
              return window.Telegram?.WebApp?.CloudStorage.setItem(
                key,
                value,
                () => {}
              )
            },
            removeItem: (key: string) => {
              // @ts-ignore
              return window.Telegram?.WebApp?.CloudStorage.removeItem(
                key,
                () => {}
              )
            },
          }
        }

        return telegramStorage()
      }),
    }
  )
)
