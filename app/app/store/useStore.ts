import { useEffect, useContext } from 'react'
import { TelegramContext } from '../TelegramProvider'
import { useFavoritePodcasts } from './useFavoritePodcasts'
import { useContinueListening } from './useContinueListening'
import { useListeningEpisode } from './useListeningEpisode'

export const useInitStore = () => {
  const { webApp } = useContext(TelegramContext)
  const loadFavorites = useFavoritePodcasts((state) => state.loadFavorites)
  const loadEpisodeActive = useListeningEpisode((state) => state.loadEpisode)
  const loadContinueListening = useContinueListening(
    (state) => state.loadEpisodes
  )

  useEffect(() => {
    if (webApp) {
      loadFavorites()
      loadEpisodeActive()
      loadContinueListening()
    }
  }, [webApp, loadFavorites, loadEpisodeActive, loadContinueListening])
}
