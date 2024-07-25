import { cache } from 'react'
import { PodcastsTrendingResponse } from '@/app/types'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { headers } from 'next/headers'

function parseAcceptLanguage(language: string | null) {
  if (!language) {
    return []
  }

  return language
    .split(',')
    .map((part) => part.trim().split(';'))
    .map(([lang, q = 'q=1.0']) => {
      const quality = parseFloat(q.split('=')[1])
      return { lang, quality }
    })
    .sort((a, b) => b.quality - a.quality)
}

export const getTopShows = cache(
  async (): Promise<PodcastsTrendingResponse['feeds']> => {
    const acceptLanguage = headers().get('accept-language')
    const languages = parseAcceptLanguage(acceptLanguage)
    const language = languages[0]?.lang || 'en-US'

    const data = await podcastIndex.podcastsTrending(12, null, language)

    return data.feeds
  }
)
