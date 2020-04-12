export default function excludeEqualDates (...dateList: Array<Date | undefined | null>) {
  const sanitizedDateList = dateList.filter(Boolean) as Date[]
  return sanitizedDateList
    .map(date => date.getTime())
    .filter((date, i, arr) => arr.indexOf(date) === i)
    .map(time => new Date(time))
}
