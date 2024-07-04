import { podcastIndex } from '@/app/utils/podcastIndex'
import { Caption, Title, Text } from '@telegram-apps/telegram-ui'
import { Play } from './Play'

type PodcastPageProps = {
  params: {
    id: string
  }
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const podcast = await podcastIndex.podcastsByFeedId(params.id)
  const epicodes = await podcastIndex.episodesByFeedId(params.id)

  return (
    <div>
      <div className='p-4 flex flex-row border-b border-gray-200'>
        <img
          src={podcast.feed.image}
          alt={podcast.feed.title}
          className='w-28 h-28 object-cover rounded-md mr-4'
        />
        <div className='flex flex-col justify-start'>
          <Title level='1'>{podcast.feed.title}</Title>
          <Caption weight='2'>{podcast.feed.author}</Caption>
        </div>
      </div>

      {/* <Headline weight='2'>Episodes</Headline> */}

      {epicodes.items.map((episode: any) => (
        <div key={episode.id} className='px-4 py-2 flex flex-row'>
          <Play episode={episode} author={podcast.feed.title} />
          <div className='flex flex-col justify-start ml-2'>
            <Text weight='2'>{episode.title}</Text>
            <Caption className='text-gray-500 mt-2'>
              {episode.datePublishedPretty}
            </Caption>
          </div>

          {/* <p>{episode.description}</p> */}
          {/* <audio className='w-full mt-4' controls>
            <source src={episode.enclosureUrl} type='audio/mpeg' />
          </audio> */}
        </div>
      ))}
    </div>
  )
}
