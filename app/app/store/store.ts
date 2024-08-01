'use server'

import { db } from '@/firebaseAdmin'
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
  await db
    .collection(CONTINUE_LISTENING_KEY)
    .doc(userId.toString())
    .set(Object.assign({}, episodes))
}

export const getContinueListening = async (userId: number) => {
  const snapshot = await db
    .collection(CONTINUE_LISTENING_KEY)
    .doc(userId.toString())
    .get()

  return Object.assign([], snapshot.data()) as EpisodeContinue[]
}

export const setFavoritePodcasts = async (
  favorites: FavoritePodcast[],
  userId: number
) => {
  await db
    .collection(FAVORITE_PODCASTS_KEY)
    .doc(userId.toString())
    .set(Object.assign({}, favorites))
}

export const getFavoritePodcasts = async (userId: number) => {
  const snapshot = await db
    .collection(FAVORITE_PODCASTS_KEY)
    .doc(userId.toString())
    .get()

  return Object.assign([], snapshot.data())
}

export const setListeningEpisode = async (episode: Episode, userId: number) => {
  await db.collection(LISTENING_EPISODE_KEY).doc(userId.toString()).set(episode)
}

export const getListeningEpisode = async (userId: number) => {
  const snapshot = await db
    .collection(LISTENING_EPISODE_KEY)
    .doc(userId.toString())
    .get()

  return snapshot.data() as Episode
}
