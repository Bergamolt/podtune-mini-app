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
  loadFavorites: () => void
}

export const useFavoritePodcasts = create<FavoritePodcasts>((set, get) => ({
  favorites: [],
  setFavorites: (podcast: FavoritePodcast) => {
    const favorites = get().favorites
    const isFavorite = favorites.some((p) => p.id === podcast.id)

    if (isFavorite) {
      set({ favorites: favorites.filter((p) => p.id !== podcast.id) })
    } else {
      set({ favorites: [...favorites, podcast] })
    }

    window.Telegram.WebApp.CloudStorage.setItem(
      'favorite-podcasts',
      JSON.stringify(get().favorites)
    )
  },
  loadFavorites: async () => {
    const data = await window.Telegram.WebApp.CloudStorage.getItem(
      'favorite-podcasts',
      (error: Error) => {
        window.Telegram.WebApp.showAlert(error.message)
      }
    )

    if (data) {
      // @ts-ignore
      set({ favorites: data })
    }
  },
}))
