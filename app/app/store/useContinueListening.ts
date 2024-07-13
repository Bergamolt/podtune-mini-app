import { create } from 'zustand'
import { Episode } from './useListeningEpisode'

export type EpisodeContinue = Episode & {
  position: number
  duration: number
}

type ContinueListening = {
  episodes: EpisodeContinue[]
  setEpisodes: (episode: EpisodeContinue) => void
  loadEpisodes: () => void
}

export const useContinueListening = create<ContinueListening>((set, get) => ({
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

    window.Telegram.WebApp.CloudStorage.setItem(
      'continue-listening',
      JSON.stringify(get().episodes)
    )
  },
  loadEpisodes: async () => {
    window?.Telegram.WebApp.CloudStorage.getItem(
      'continue-listening',
      (error: Error | null, value: string) => {
        if (error?.message) {
          window.Telegram.WebApp.showAlert(error.message)
        }

        if (value) {
          set({
            episodes: [...get().episodes, ...JSON.parse(value)],
          })
        }
      }
    )
  },
}))
