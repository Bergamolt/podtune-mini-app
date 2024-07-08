import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Episode } from './useListeningEpisode'

export type EpisodeContinue = Episode & {
  position: number
  duration: number
}

type ContinueListening = {
  episodes: EpisodeContinue[]
  setEpisodes: (episode: EpisodeContinue) => void
}

export const useContinueListening = create(
  persist<ContinueListening>(
    (set, get) => ({
      episodes: [],
      setEpisodes: (episode: EpisodeContinue) => {
        const episodes = get().episodes
        const added = episodes.find((e) => e.url === episode.url)

        if (!added) {
          set({
            episodes: [episode, ...episodes],
          })
        } else {
          added.position = episode.position

          set({
            episodes: [added, ...episodes.filter((e) => e.url !== episode.url)],
          })
        }
      },
    }),
    {
      name: 'continue-listening',
      skipHydration: true,
      // @ts-ignore
      // storage: createJSONStorage(() => window.Telegram?.WebApp?.CloudStorage),
    }
  )
)
