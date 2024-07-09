// useStore.ts
import { useState, useEffect, useContext } from 'react'
import { TelegramContext } from '../TelegramProvider'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const { webApp } = useContext(TelegramContext)
  console.log(webApp)
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore
