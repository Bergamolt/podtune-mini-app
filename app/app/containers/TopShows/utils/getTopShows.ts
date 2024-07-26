import { cache } from 'react'
import { PodcastsTrendingResponse } from '@/app/types'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { headers } from 'next/headers'

// function parseAcceptLanguage(language: string | null) {
//   if (!language) {
//     return []
//   }

//   return language
//     .split(',')
//     .map((part) => part.trim().split(';'))
//     .map(([lang, q = 'q=1.0']) => {
//       const quality = parseFloat(q.split('=')[1])
//       return { lang, quality }
//     })
//     .sort((a, b) => b.quality - a.quality)
// }

export const getTopShows = cache(
  async (): Promise<PodcastsTrendingResponse['feeds']> => {
    const country = headers().get('x-geo-country')
    console.log({ country })
    // const languages = parseAcceptLanguage(acceptLanguage)
    // console.log(headers().get('geo'))s
    // const language = languages[0]?.lang || 'en-US'

    const data = await podcastIndex.podcastsTrending(12, null, country)

    return data.feeds
  }
)
