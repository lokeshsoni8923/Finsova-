// Returns initials from string
// export const getInitials = (string: string) =>
//   string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

export const getInitials = (name: string = ''): string => {
  if (!name) return '?'

  const words = name.trim().split(' ')
  const initials = words.map(word => word[0]).join('').toUpperCase()

  return initials || '?'
}
