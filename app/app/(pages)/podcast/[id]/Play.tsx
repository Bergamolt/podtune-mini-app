'use client'

import { useListeningEpisode } from '@/app/store/useListeningEpisode'
import { IoPauseCircleSharp, IoPlayCircleSharp } from 'react-icons/io5'

type PlayProps = {
  title: string
  image: string
  url: string
  author: string
  duration: number
}

export function Play({ author, title, image, url, duration }: PlayProps) {
  const episode = useListeningEpisode((state) => state.episode)
  const setEpisode = useListeningEpisode((state) => state.setEpisode)

  const handlePlay = () => {
    setEpisode({
      title,
      author,
      image,
      url,
      duration,
    })
  }

  return (
    <button onClick={handlePlay}>
      {episode?.url !== url ? (
        <IoPlayCircleSharp
          className='text-[var(--tgui--button\_color)]'
          size={32}
        />
      ) : (
        <IoPauseCircleSharp
          className='text-[var(--tgui--button\_color)]'
          size={32}
        />
      )}
    </button>
  )
}
