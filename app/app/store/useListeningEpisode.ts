import { create } from 'zustand'
import { useContinueListening } from './useContinueListening'
import { getListeningEpisode, setListeningEpisode } from './store'

export type Episode = {
  title: string
  author: string
  image: string
  url: string
  duration: number
  position: number
}

type ListeningEpisode = {
  episode: Episode | null
  setEpisode: (episode: Episode, userId: number) => void
  loadEpisode: (userId: number) => void
}

export const useListeningEpisode = create<ListeningEpisode>((set) => ({
  episode: null,
  setEpisode: async (episode, userId) => {
    const setContinueListenig = useContinueListening.getState().setEpisodes

    set({ episode })
    setContinueListenig(episode, userId)

    try {
      await setListeningEpisode(episode, userId)
    } catch (error) {
      console.error(error)
    }
  },
  loadEpisode: async (userId) => {
    try {
      const data = await getListeningEpisode(userId)
      set({ episode: data })
    } catch (error) {
      console.error(error)
    }
  },
}))
