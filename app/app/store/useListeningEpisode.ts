import { create } from 'zustand'
import { useContinueListening } from './useContinueListening'

export type Episode = {
  title: string
  author: string
  image: string
  url: string
  duration: number
  position?: number
}

type ListeningEpisode = {
  episode: Episode | null
  setEpisode: (episode: Episode) => void
  loadEpisode: () => void
}

export const useListeningEpisode = create<ListeningEpisode>((set) => ({
  episode: null,
  setEpisode: async (episode: Episode) => {
    const continueListenigEpisodes = useContinueListening.getState().episodes

    const isAdded = continueListenigEpisodes.find((e) => e.url === episode.url)

    if (!isAdded) {
      set({ episode: { ...episode, position: 0 } })
    } else {
      set({ episode: isAdded })
    }

    try {
      await window.Telegram.WebApp.CloudStorage.setItem(
        'listening-episode',
        JSON.stringify(episode)
      )
    } catch (error) {
      console.error(error)
    }
  },
  loadEpisode: () => {
    try {
      window?.Telegram.WebApp.CloudStorage.getItem(
        'listening-episode',
        (error: Error | null, value: string) => {
          if (error?.message) {
            window.Telegram.WebApp.showAlert(error.message)
          }

          if (value) {
            set({ episode: JSON.parse(value) })
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
  },
}))
