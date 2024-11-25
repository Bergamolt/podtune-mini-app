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
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)

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

  useEffect(() => {
    if (!episode) return

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: episode.title,
        artist: episode.author,
        artwork: episode.image ? [{ src: episode.image }] : undefined
      })

      navigator.mediaSession.setActionHandler('play', () => {
        playerRef.current?.audio.current?.play()
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        playerRef.current?.audio.current?.pause()
      })
    }
  }, [episode, playerRef])

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          const lock = await navigator.wakeLock.request('screen');
          setWakeLock(lock);
        }
      } catch (err) {
        console.error('Ошибка WakeLock:', err);
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLock) {
        await wakeLock.release();
        setWakeLock(null);
      }
    };

    if (episode) {
      requestWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [episode]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && episode) {
        try {
          if ('wakeLock' in navigator) {
            const lock = await navigator.wakeLock.request('screen');
            setWakeLock(lock);
          }
        } catch (err) {
          console.error('Ошибка WakeLock:', err);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [episode]);

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
          if ('mediaSession' in navigator) {
            navigator.mediaSession.setPositionState({
              duration: playerRef.current.audio.current.duration,
              position: playerRef.current.audio.current.currentTime
            })
          }
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
