import { Headline, Spinner } from '@telegram-apps/telegram-ui'
import { Suspense } from 'react'
import { Shows } from './Shows'

export async function TopShows() {
  return (
    <section className='p-4 w-full'>
      <Headline weight='2'>Top Shows</Headline>
      <Suspense
        fallback={
          <div className='flex justify-center items-center h-96'>
            <Spinner size='s' />
          </div>
        }
      >
        <div className='grid grid-cols-3 gap-2 w-full max-w-screen-lg mx-auto mt-4'>
          <Shows />
        </div>
      </Suspense>
    </section>
  )
}
