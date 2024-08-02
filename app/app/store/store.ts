import { getData, setData } from '@/firebase'
import { Episode } from './useListeningEpisode'
import { FavoritePodcast } from './useFavoritePodcasts'
import { EpisodeContinue } from './useContinueListening'

const CONTINUE_LISTENING_KEY = 'continue-listening'
const FAVORITE_PODCASTS_KEY = 'favorite-podcasts'
const LISTENING_EPISODE_KEY = 'listening-episode'

export const setContinueListening = async (
  episodes: EpisodeContinue[],
  userId: number
) => {
  await setData(CONTINUE_LISTENING_KEY, Object.assign({}, episodes), userId)
}

export const getContinueListening = async (userId: number) => {
  const data = await getData<EpisodeContinue[]>(CONTINUE_LISTENING_KEY, userId)

  return Object.assign([], data)
}

export const setFavoritePodcasts = async (
  favorites: FavoritePodcast[],
  userId: number
) => {
  await setData(FAVORITE_PODCASTS_KEY, Object.assign({}, favorites), userId)
}

export const getFavoritePodcasts = async (userId: number) => {
  const data = await getData<FavoritePodcast[]>(FAVORITE_PODCASTS_KEY, userId)

  return Object.assign([], data)
}

export const setListeningEpisode = async (episode: Episode, userId: number) => {
  await setData(LISTENING_EPISODE_KEY, episode, userId)
}

export const getListeningEpisode = async (userId: number) => {
  return await getData<Episode>(LISTENING_EPISODE_KEY, userId)
}
