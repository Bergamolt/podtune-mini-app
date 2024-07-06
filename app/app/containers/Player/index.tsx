'use client'

import { createRef, useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import H5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useListeningEpisode } from '@/app/store/useListeningEpisode'
import { useContinueListening } from '@/app/store/useContinueListening'

export function Player() {
  const episode = useListeningEpisode((state) => state.episode)
  const setEpisodes = useContinueListening((state) => state.setEpisodes)
  const [isReady, setIsReady] = useState(false)
  const playerRef = createRef<H5AudioPlayer>()

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
      const currentTime = episode.position === 0 ? 0 : episode.position / 1000
      playerRef.current.audio.current.currentTime = currentTime
      playerRef.current.audio.current.play()
    }

    return () => {
      setIsReady(false)
      playerRef.current?.audio.current?.pause()
    }
  }, [episode, isReady, playerRef])

  if (!episode) {
    return null
  }

  return (
    <AudioPlayer
      ref={playerRef}
      src={episode.url}
      onPlay={(e) => console.log('onPlay')}
      onLoadedData={() => {
        setIsReady(true)
      }}
      onListen={(e) => {
        setEpisodes({
          title: episode.title,
          author: episode.author,
          image: episode.image,
          url: episode.url,
          position: e.timeStamp,
          duration: episode.duration,
        })
      }}
      className='bg-[var(--tg--plain\_background)] shadow-none player'
      autoPlay={false}
      customVolumeControls={[]}
      customAdditionalControls={[]}
    />
  )
}
