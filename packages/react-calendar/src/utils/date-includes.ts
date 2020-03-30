export default function dateIncludes (arr: Date[], date: Date) {
  const dateString = date.toLocaleDateString()
  for (const _date of arr) {
    if (_date.toLocaleDateString() === dateString) {
      return true
    }
  }

  return false
}