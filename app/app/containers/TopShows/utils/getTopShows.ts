import { PodcastsTrendingResponse } from '@/app/types'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { headers } from 'next/headers'
import { getLanguageCode } from '@/app/utils/getLanguageCode'

export const getTopShows = async (): Promise<
  PodcastsTrendingResponse['feeds']
> => {
  const country = headers().get('x-geo-country')
  const lang = getLanguageCode(country)
  let data = await podcastIndex.podcastsTrending(12, null, lang)

  if (data.feeds.length) {
    return data.feeds
  }

  // Fallback if no data is returned for the country
  data = await podcastIndex.podcastsTrending(12, null, 'en')

  return data.feeds
}
