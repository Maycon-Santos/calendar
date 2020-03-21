export default function compareDates (...dates: Array<Date | null>) {
  const datesSet = new Set(dates.map(date => date?.toLocaleDateString()))
  return datesSet.size === 1
}
