'use client'

import { usePlayer } from '@/app/context/player'
import { useListeningEpisode } from '@/app/store/useListeningEpisode'
import { useTelegram } from '@/app/TelegramProvider'
import { IoPauseCircleSharp, IoPlayCircleSharp } from 'react-icons/io5'

type PlayProps = {
  title: string
  image: string
  url: string
  author: string
  duration: number
}

export function Play({ author, title, image, url, duration }: PlayProps) {
  const { user } = useTelegram()
  const episode = useListeningEpisode((state) => state.episode)
  const setEpisode = useListeningEpisode((state) => state.setEpisode)
  const { isPlaying, play, pause } = usePlayer()

  const handlePlay = () => {
    if (episode?.url === url) {
      isPlaying ? pause() : play()
    }

    setEpisode({ author, title, image, url, duration, position: 0 }, user.id)
  }

  if (isPlaying && episode?.url === url) {
    return (
      <button onClick={handlePlay}>
        <IoPauseCircleSharp
          className='text-[var(--tgui--button\_color)]'
          size={32}
        />
      </button>
    )
  }

  return (
    <button onClick={handlePlay}>
      <IoPlayCircleSharp
        className='text-[var(--tgui--button\_color)]'
        size={32}
      />
    </button>
  )
}
