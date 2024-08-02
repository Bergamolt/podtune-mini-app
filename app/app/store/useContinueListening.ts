import { create } from 'zustand'
import { Episode } from './useListeningEpisode'
import { getContinueListening, setContinueListening } from './store'

export type EpisodeContinue = Episode & {
  position: number
  duration: number
}

type ContinueListening = {
  episodes: EpisodeContinue[]
  setEpisodes: (episode: EpisodeContinue, userId: number) => void
  loadEpisodes: (userId: number) => void
  loaded: boolean
}

export const useContinueListening = create<ContinueListening>((set, get) => ({
  episodes: [],
  loaded: false,
  setEpisodes: async (episode, userId) => {
    const episodes = get().episodes
    const added = episodes.find((e) => e.url === episode.url)
    console.log(episode)
    if (!added) {
      set({
        episodes: [episode].concat(episodes),
      })
    } else {
      added.position = episode.position
      added.duration = episode.duration

      set({
        episodes: [added].concat(episodes.filter((e) => e.url !== episode.url)),
      })
    }

    try {
      await setContinueListening(get().episodes, userId)
    } catch (error) {
      console.error(error)
    }
  },
  loadEpisodes: async (userId) => {
    try {
      const data = await getContinueListening(userId)
      set({ episodes: data })
      set({ loaded: true })
    } catch (error) {
      console.error(error)
      set({ loaded: true })
    }
  },
}))
