import { Suspense } from 'react'
import { Caption, Title, Divider, Spinner } from '@telegram-apps/telegram-ui'
import { Favorite } from './components/Favorite'
import { getPodcastByFeedId } from './utils/getPodcastByFeedId'
import { Episodes } from './components/Episodes'

type Params = Promise<{
  id: string
}>

type PodcastPageProps = {
  params: Params
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const { id } = await params
  const podcast = await getPodcastByFeedId(id)

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
            id={podcast.id}
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
        <Episodes
          id={podcast.id}
          author={podcast.author}
          image={podcast.image}
        />
      </Suspense>
    </>
  )
}
