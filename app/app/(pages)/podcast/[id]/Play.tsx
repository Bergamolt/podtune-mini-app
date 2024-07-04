'use client'

import { useListeningEpisode } from '@/app/store/useListeningEpisode'

type PlayProps = {
  episode: any
  author: string
}

export function Play({ episode, author }: PlayProps) {
  const setEpisode = useListeningEpisode((state) => state.setEpisode)

  console.log(episode)

  const handlePlay = () => {
    setEpisode({
      title: episode.title,
      author: author,
      image: episode.image,
      url: episode.enclosureUrl,
    })
  }

  return (
    <button onClick={handlePlay} className='button button--primary'>
      Play
    </button>
  )
}
