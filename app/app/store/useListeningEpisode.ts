import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
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
