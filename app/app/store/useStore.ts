import { useEffect, useContext } from 'react'
import { TelegramContext } from '../TelegramProvider'
import { useFavoritePodcasts } from './useFavoritePodcasts'

export const useInitStore = () => {
  const { webApp } = useContext(TelegramContext)
  const loadFavorites = useFavoritePodcasts((state) => state.loadFavorites)

  useEffect(() => {
    if (webApp) {
      loadFavorites()
    }
  }, [webApp, loadFavorites])
}
