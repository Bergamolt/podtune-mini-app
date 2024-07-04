import { cache } from 'react'
import { PodcastsTrendingResponse } from '@/app/types'
import { podcastIndex } from '@/app/utils/podcastIndex'

export const getTopShows = cache(
  async (): Promise<PodcastsTrendingResponse['feeds']> => {
    const data = await podcastIndex.podcastsTrending(12, null, 'uk')

    return data.feeds
  }
)
