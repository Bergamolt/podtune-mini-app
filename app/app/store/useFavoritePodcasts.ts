import { create } from 'zustand'
import { getFavoritePodcasts, setFavoritePodcasts } from './store'

export type FavoritePodcast = {
  id: string
  title: string
  image: string
  author: string
}

type FavoritePodcasts = {
  favorites: FavoritePodcast[]
  setFavorites: (podcast: FavoritePodcast, userId: number) => void
  loadFavorites: (userId: number) => void
  loaded: boolean
}

export const useFavoritePodcasts = create<FavoritePodcasts>((set, get) => ({
  favorites: [],
  loaded: false,
  setFavorites: async (podcast, userId) => {
    const favorites = get().favorites
    const isFavorite = favorites.some((p) => p.id === podcast.id)

    if (isFavorite) {
      set({ favorites: favorites.filter((p) => p.id !== podcast.id) })
    } else {
      set({ favorites: [...favorites, podcast] })
    }

    try {
      await setFavoritePodcasts(get().favorites, userId)
    } catch (error) {
      console.error(error)
    }
  },
  loadFavorites: async (userId) => {
    try {
      const data = await getFavoritePodcasts(userId)
      set({ favorites: data })
      set({ loaded: true })
    } catch (error) {
      console.error(error)
      set({ loaded: true })
    }
  },
}))
