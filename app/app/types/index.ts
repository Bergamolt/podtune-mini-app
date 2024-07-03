export interface PodcastsTrendingResponse {
  status: string
  feeds: Feed[]
  count: number
  max: number
  since: number
  description: string
}

export interface Feed {
  id: number
  url: string
  title: string
  description: string
  author: string
  image: string
  artwork: string
  newestItemPublishTime: number
  itunesId: number
  trendScore: number
  language: string
  categories: Categories
}

export interface Categories {
  [key: string]: string
}

export type SocialInteract = {
  url: string
  protocol: string
  accountId: string
  accountUrl: string
  priority: number
}

export type Person = {
  id: number
  name: string
  role: string
  group: string
  href: string
  img: string
}

export type Transcript = {
  url: string
  type: string
}

export type Soundbite = {
  startTime: number
  duration: number
  title: string
}

export type ValueDestination = {
  name: string
  address: string
  type: string
  split: number
  fee: boolean
  customKey: string
  customValue: string
}

export type ValueModel = {
  type: string
  method: string
  suggested: string
}

export type Value = {
  model: ValueModel
  destinations: ValueDestination[]
}

export type Item = {
  id: number
  title: string
  link: string
  description: string
  guid: string
  datePublished: number
  datePublishedPretty: string
  dateCrawled: number
  enclosureUrl: string
  enclosureType: string
  enclosureLength: number
  duration: number
  explicit: number
  episode: number
  episodeType: string
  season: number
  image: string
  feedItunesId: number
  feedUrl: string
  feedImage: string
  feedId: number
  podcastGuid: string
  feedLanguage: string
  feedDead: number
  feedDuplicateOf: number
  chaptersUrl: string
  transcriptUrl: string
  transcripts: Transcript[]
  soundbite: Soundbite
  soundbites: Soundbite[]
  persons: Person[]
  socialInteract: SocialInteract[]
  value: Value
}

export type Response = {
  status: string
  liveItems: Item[]
  items: Item[]
  count: number
  query: string
  description: string
}
