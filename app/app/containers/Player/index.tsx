'use client'

import { RefObject, useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import H5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useListeningEpisode } from '@/app/store/useListeningEpisode'
import { useTelegram } from '@/app/TelegramProvider'

type PlayerProps = {
  playerRef: RefObject<H5AudioPlayer>
  onChangePlaying: (isPlaying: boolean) => void
}

export function Player({ playerRef, onChangePlaying }: PlayerProps) {
  const { webApp, user } = useTelegram()
  const episode = useListeningEpisode((state) => state.episode)
  const setEpisode = useListeningEpisode((state) => state.setEpisode)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (episode?.position === undefined) {
      return undefined
    }

    if (
      playerRef.current &&
      playerRef.current.audio &&
      playerRef.current.audio.current &&
      isReady
    ) {
      const currentTime = episode.position

      playerRef.current.audio.current.currentTime = currentTime
      playerRef.current.audio.current.play()
    }

    return () => {
      setIsReady(false)
    }
  }, [episode, isReady, playerRef])

  if (!episode) {
    return null
  }

  return (
    <AudioPlayer
      ref={playerRef}
      src={episode.url}
      onListen={() => {
        if (playerRef.current?.audio.current?.currentTime) {
          setEpisode(
            {
              title: episode.title,
              author: episode.author,
              image: episode.image,
              url: episode.url,
              position: playerRef.current?.audio.current?.currentTime,
              duration: playerRef.current?.audio.current?.duration,
            },
            user.id
          )
        }
      }}
      onLoadedData={() => setIsReady(true)}
      onPlay={() => {
        webApp?.enableClosingConfirmation()
        onChangePlaying(true)

        if (typeof document !== 'undefined') {
          document.title = episode.title
        }
      }}
      onPause={() => {
        webApp?.disableClosingConfirmation()
        onChangePlaying(false)
      }}
      customVolumeControls={[]}
      customAdditionalControls={[]}
      autoPlay={false}
      listenInterval={4000}
      className='bg-[var(--tg-theme-bg-color)] shadow-none player'
    />
  )
}
