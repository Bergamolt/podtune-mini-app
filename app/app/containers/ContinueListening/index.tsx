'use client'

import { Caption, Headline } from '@telegram-apps/telegram-ui'
import {
  EpisodeContinue,
  useContinueListening,
} from '@/app/store/useContinueListening'
import { useListeningEpisode } from '@/app/store/useListeningEpisode'
import { charLimit } from '@/app/utils/charLimit'

export function ContinueListening() {
  const episodes = useContinueListening((state) => state.episodes)
  const setEpisode = useListeningEpisode((state) => state.setEpisode)
  const loading = useContinueListening((state) => state.loading)

  const setActiveEpisode = (episode: EpisodeContinue) => () => {
    setEpisode({
      title: episode.title,
      author: episode.author,
      image: episode.image,
      url: episode.url,
      position: episode.position,
      duration: episode.duration,
    })
  }

  return (
    <section className='p-4 pb-0 w-full'>
      <Headline weight='2'>Continue listening</Headline>

      <div className='flex gap-2 w-full mx-auto mt-4 overflow-x-auto'>
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='skeletonContinue' />
          ))}

        {episodes.map((episode) => {
          // Remove episode from the list if it's already finished
          // TODO: move this logic to the store
          if (Math.floor(episode.duration - episode.position) <= 0) {
            return null
          }

          return (
            <div
              key={episode.url}
              className='flex min-w-64 max-w-64 h-20 p-2 bg-[var(--tg-theme-section-bg-color)] rounded-lg items-center overflow-hidden'
              onClick={setActiveEpisode(episode)}
            >
              <img src={episode.image} className='object-cover w-14 h-14' />
              <div className='ml-2'>
                <Caption weight='2'>{charLimit(episode.title, 40)}</Caption>
                <div>
                  <Caption>
                    {Math.floor(episode.duration - episode.position) > 60
                      ? `${Math.floor(
                          (episode.duration - episode.position) / 60
                        )} min left`
                      : `${Math.floor(
                          episode.duration - episode.position
                        )} sec`}
                  </Caption>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
