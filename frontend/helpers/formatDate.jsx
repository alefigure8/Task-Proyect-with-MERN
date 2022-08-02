export const formatDate = (date) => {
  const newDate = new Date(date)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }

  return newDate.toLocaleDateString('en-US', options)
}