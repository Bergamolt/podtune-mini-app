import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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
}

export const useListeningEpisode = create(
  persist<ListeningEpisode>(
    (set) => ({
      episode: null,
      setEpisode: (episode: Episode) => {
        const continueListenigEpisodes =
          useContinueListening.getState().episodes

        const isAdded = continueListenigEpisodes.find(
          (e) => e.url === episode.url
        )

        if (!isAdded) {
          set({ episode: { ...episode, position: 0 } })
        } else {
          set({ episode: isAdded })
        }
      },
    }),
    {
      name: 'listening-episode',
    }
  )
)
