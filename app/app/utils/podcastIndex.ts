import { podcastIndexApi } from '../../podcast-index-api'

const key = '5KXRUWKNG32BHZJW3EMA'
const secret = 'GgpGzJmjXx^DSFNu87E35x$7HXL$VEK7syQ4WQJG'
const userAgent = 'Gramcast/web'

export const podcastIndex = podcastIndexApi(key, secret, userAgent)
