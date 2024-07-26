import locale from 'country-locale-map'

export function getLanguageCode(countryCode: string | null) {
  if (!countryCode) {
    return 'en'
  }

  const language = locale.getLocaleByAlpha2(countryCode)

  if (language) {
    return language
  }

  return 'en'
}
