import { podcastIndex } from '@/app/utils/podcastIndex'
import { cache } from 'react'

export const getPodcastByFeedId = cache(async (feedId: string) => {
  const podcast = await podcastIndex.podcastsByFeedItunesId(feedId)

  return podcast.feed
})
