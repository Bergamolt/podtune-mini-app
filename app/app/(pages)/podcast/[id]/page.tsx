import { podcastIndex } from '@/app/utils/podcastIndex'
import Image from 'next/image'

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
      <div className='bg-white shadow-sm rounded-md p-4 flex flex-col'>
        <img
          src={podcast.feed.image}
          alt={podcast.feed.title}
          className='w-48 h-48 object-cover rounded-md mx-auto'
        />
        <h3 className='text-xl font-semibold mt-4'>{podcast.feed.title}</h3>
        <p className='text-gray-500 mt-2'>{podcast.feed.description}</p>
      </div>
      {epicodes.items.map((episode) => (
        <div
          key={episode.id}
          className='bg-white shadow-sm rounded-md p-4 mt-4'
        >
          <p className='text-xl font-semibold'>{episode.title}</p>
          <p className='text-gray-500 mt-2'>{episode.datePublishedPretty}</p>
          {/* <p>{episode.description}</p> */}
          <audio className='w-full mt-4' controls>
            <source src={episode.enclosureUrl} type='audio/mpeg' />
          </audio>
        </div>
      ))}
    </div>
  )
}
