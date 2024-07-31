import { useEffect, useContext } from 'react'
import { TelegramContext } from '../TelegramProvider'
import { useFavoritePodcasts } from './useFavoritePodcasts'
import { useContinueListening } from './useContinueListening'
import { useListeningEpisode } from './useListeningEpisode'

export const useInitStore = () => {
  const { webApp, user } = useContext(TelegramContext)
  const loadFavorites = useFavoritePodcasts((state) => state.loadFavorites)
  const loadEpisodeActive = useListeningEpisode((state) => state.loadEpisode)
  const loadContinueListening = useContinueListening(
    (state) => state.loadEpisodes
  )

  useEffect(() => {
    if (webApp) {
      loadFavorites(user.id)
      loadEpisodeActive(user.id)
      loadContinueListening(user.id)
    }
  }, [webApp, loadFavorites, loadEpisodeActive, loadContinueListening, user.id])
}
