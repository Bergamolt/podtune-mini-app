'use client'

import AudioPlayer from 'react-h5-audio-player'
import H5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useListeningEpisode } from '@/app/store/useListeningEpisode'
import { FixedLayout } from '@telegram-apps/telegram-ui'
import { createRef, useEffect, useState } from 'react'

export function Player() {
  const episode = useListeningEpisode((state) => state.episode)
  const playerRef = createRef<H5AudioPlayer>()

  // useEffect(() => {
  //   if (playerRef.current) {
  //     playerRef.current.audio.current.currentTime = 10
  //   }
  // }, [playerRef])

  if (!episode) {
    return null
  }

  return (
    <FixedLayout vertical='bottom' className='p-2 !bottom-2'>
      <AudioPlayer
        ref={playerRef}
        src={episode.url}
        onPlay={(e) => console.log('onPlay')}
        onListen={(e) => {
          // const position = e.timeStamp * 1000
        }}
        className='rounded-md bg-[var(--secondary_bg_color)]'
      />
    </FixedLayout>
  )
}
