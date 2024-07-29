export const charLimit = (title: string, limit: number) => {
  return title.length > limit ? title.substring(0, limit) + '...' : title
}
