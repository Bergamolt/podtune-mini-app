import { create } from 'zustand'

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
  loading: boolean
}

export const useFavoritePodcasts = create<FavoritePodcasts>((set, get) => ({
  loading: false,
  favorites: [],
  setFavorites: async (podcast: FavoritePodcast) => {
    const favorites = get().favorites
    const isFavorite = favorites.some((p) => p.id === podcast.id)

    if (isFavorite) {
      set({ favorites: favorites.filter((p) => p.id !== podcast.id) })
    } else {
      set({ favorites: [...favorites, podcast] })
    }

    try {
      await window.Telegram.WebApp.CloudStorage.setItem(
        'favorite-podcasts',
        JSON.stringify(get().favorites)
      )
    } catch (error) {
      console.error(error)
    }
  },
  loadFavorites: async () => {
    set({ loading: true })

    try {
      window?.Telegram.WebApp.CloudStorage.getItem(
        'favorite-podcasts',
        (error: Error | null, value: string) => {
          if (error?.message) {
            window.Telegram.WebApp.showAlert(error.message)
          }

          if (value) {
            set({
              favorites: [...get().favorites, ...JSON.parse(value)],
            })
          }

          set({ loading: false })
        }
      )
    } catch (error) {
      console.error(error)
    }
  },
}))
