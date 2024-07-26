const countryToLanguage: { [key: string]: string } = {
  US: 'en-US',
  RU: 'ru',
  UA: 'uk',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  CN: 'zh',
  JP: 'ja',
  CA: 'en-CA',
}

export function getLanguageCode(countryCode: string | null) {
  if (!countryCode) {
    return 'en'
  }

  const language = countryToLanguage[countryCode]

  if (language) {
    return language
  }

  return 'en'
}
