export const formatDate = (date: Date | string): string =>
  new Date(date).toLocaleDateString('us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
