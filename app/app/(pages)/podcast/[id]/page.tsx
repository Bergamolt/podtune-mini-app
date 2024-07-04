import { podcastIndex } from '@/app/utils/podcastIndex'
import { Caption, Title, Text, Divider } from '@telegram-apps/telegram-ui'
import { Play } from './Play'
import React from 'react'

type PodcastPageProps = {
  params: {
    id: string
  }
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const podcast = await podcastIndex.podcastsByFeedId(params.id)
  const epicodes = await podcastIndex.episodesByFeedId(params.id)

  return (
    <>
      <div className='p-4 flex flex-row bg-[var(--tgui--section\_bg_\color)]'>
        <img
          src={podcast.feed.image}
          alt={podcast.feed.title}
          className='w-28 h-28 object-cover rounded-md mr-4'
        />
        <div className='flex flex-col justify-center'>
          <Title level='1'>{podcast.feed.title}</Title>
          <Caption weight='2'>{podcast.feed.author}</Caption>
        </div>
      </div>
      <Divider />

      {epicodes.items.map((episode: any) => (
        <React.Fragment key={episode.id}>
          <div className='px-4 py-2 flex flex-row'>
            <Play episode={episode} author={podcast.feed.title} />
            <div className='flex flex-col justify-start ml-2'>
              <Text weight='2'>{episode.title}</Text>
              <Caption className='text-gray-500 mt-2'>
                {episode.datePublishedPretty}
              </Caption>
            </div>
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </>
  )
}
