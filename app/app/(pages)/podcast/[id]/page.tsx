import { Suspense } from 'react'
import { Caption, Title, Divider, Spinner } from '@telegram-apps/telegram-ui'
import { Favorite } from './Favorite'
import { getPodcastByFeedId } from './utils/getPodcastByFeedId'
import { Epicodes } from './Episodes'

type PodcastPageProps = {
  params: {
    id: string
  }
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const podcast = await getPodcastByFeedId(params.id)

  return (
    <>
      <div className='p-4 flex flex-row]'>
        <img
          src={podcast.image}
          alt={podcast.title}
          className='w-28 h-28 object-cover rounded-md mr-4'
        />
        <div className='flex flex-col justify-center'>
          <Title level='1'>{podcast.title}</Title>
          <Caption weight='2' className='text-gray-500'>
            {podcast.author}
          </Caption>
          <Favorite
            id={podcast.itunesId}
            title={podcast.title}
            image={podcast.image}
            author={podcast.author}
          />
        </div>
      </div>
      <Divider />

      <Suspense
        fallback={
          <div className='flex justify-center items-center h-96'>
            <Spinner size='s' />
          </div>
        }
      >
        <Epicodes id={podcast.id} author={podcast.author} />
      </Suspense>
    </>
  )
}
