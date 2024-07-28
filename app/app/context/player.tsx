'use client'

import {
  createContext,
  createRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import { Player } from '@/app/containers/Player'

type ContextPlayer = {
  isPlaying: boolean
  play: () => void
  pause: () => void
}

export const PlayerContext = createContext<ContextPlayer | undefined>(undefined)

export function PlayerProvider({ children }: PropsWithChildren) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = createRef<H5AudioPlayer>()

  const play = useCallback(() => {
    playerRef.current?.audio.current?.play()
  }, [playerRef])

  const pause = useCallback(() => {
    playerRef.current?.audio.current?.pause()
  }, [playerRef])

  const value = useMemo(
    () => ({ play, pause, isPlaying }),
    [play, pause, isPlaying]
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <Player playerRef={playerRef} onChangePlaying={setIsPlaying} />
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)

  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }

  return context
}
