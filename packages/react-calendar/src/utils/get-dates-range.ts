import dateDiff from "./date-diff"

export default function getDatesRange (date1: Date, date2: Date) {
  const rangeDiff = dateDiff(date1, date2)
  const rangeDiffAbs = Math.abs(rangeDiff)
  const date = new Date(date1)
  const dates: Date[] = [new Date(date)]

  for (let i = 0; i < rangeDiffAbs; i++) {
    date.setDate(date.getDate() + (rangeDiff / rangeDiffAbs))
    dates.push(new Date(date))
  }

  return dates
}