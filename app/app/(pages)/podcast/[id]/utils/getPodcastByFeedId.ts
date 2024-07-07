import { podcastIndex } from '@/app/utils/podcastIndex'
import { cache } from 'react'

export const getPodcastByFeedId = cache(async (feedId: string) => {
  const podcast = await podcastIndex.podcastsByFeedId(feedId)

  return podcast.feed
})
