import React from 'react'
import { Caption, Text, Divider } from '@telegram-apps/telegram-ui'
import { podcastIndex } from '@/app/utils/podcastIndex'
import { Play } from './Play'

type EpisodesProps = {
  id: string
  author: string
  image: string
}

export async function Episodes({ id, author, image }: EpisodesProps) {
  const epicodes = await podcastIndex.episodesByFeedId(id)

  return epicodes.items.map((episode: any) => (
    <React.Fragment key={episode.id}>
      <div className='px-4 py-2 flex flex-row'>
        <Play
          author={author}
          title={episode.title}
          url={episode.enclosureUrl}
          image={episode.image || image}
          duration={episode.duration}
        />
        <div className='flex flex-col justify-start ml-2'>
          <Text weight='2'>{episode.title}</Text>
          <Caption className='text-gray-500 mt-2'>
            {episode.datePublishedPretty}
          </Caption>
        </div>
      </div>
      <Divider />
    </React.Fragment>
  ))
}
