import { PodcastsTrendingResponse } from '@/app/types'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { headers } from 'next/headers'
import { getLanguageCode } from '@/app/utils/getLanguageCode'

const getRandomPodcasts = (
  podcasts: PodcastsTrendingResponse['feeds'],
  count: number
) => {
  const randomPodcasts: PodcastsTrendingResponse['feeds'] = []
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * podcasts.length)

    if (randomPodcasts.includes(podcasts[randomIndex])) {
      i--
      continue
    }

    randomPodcasts.push(podcasts[randomIndex])
  }
  return randomPodcasts
}

export const getTopShows = async (): Promise<
  PodcastsTrendingResponse['feeds']
> => {
  const country = headers().get('x-geo-country')
  const lang = getLanguageCode(country)
  let data = await podcastIndex.podcastsTrending(100, null, lang)

  if (data.feeds.length === 0) {
    // Fallback if no data is returned for the country
    data = await podcastIndex.podcastsTrending(100, null, 'en')
  }

  return getRandomPodcasts(data.feeds, 12)
}
