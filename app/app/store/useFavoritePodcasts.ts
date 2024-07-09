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
      // @ts-ignore
      storage: createJSONStorage(() => {
        return {
          getItem: async (name: string) => {
            return window.Telegram.WebApp.CloudStorage.getItem(name, () => {})
          },
          setItem: (name: string, value: string) => {
            return window.Telegram.WebApp.CloudStorage.setItem(name, value)
          },
          removeItem: (name: string) => {
            return window.Telegram.WebApp.CloudStorage.removeItem(name)
          },
        }
      }),
      skipHydration: true,
    }
  )
)
