import { CalendarProps } from '../../shared-types'
import dateBetweenRange from '../../utils/date-between-range'
import dateDiff from '../../utils/date-diff'
import dateSort from '../../utils/date-sort'
import excludeEqualDates from '../../utils/exclude-equal-dates'

interface GetPickRangeClassNames {
  date: Date
  selectedDates: Date[]
  isInvalidDate: boolean
  classNames: CalendarProps['classNames']
  dateMouseOver: Date | null
  rangeSize: Exclude<CalendarProps['rangeSize'], undefined>
}

export default function getPickRangeClassNames (
  params: GetPickRangeClassNames
) {
  const {
    selectedDates,
    dateMouseOver,
    date,
    rangeSize,
    isInvalidDate,
    classNames
  } = params

  const selectedDatesSize = selectedDates.length
  const range = excludeEqualDates(
    selectedDates[0],
    selectedDates[1] || dateMouseOver
  )
  const hasRange = range.length === 2

  const inBetweenRange =
    selectedDatesSize > 0 &&
    dateBetweenRange(
      ...excludeEqualDates(selectedDates[0], dateMouseOver),
      date
    )
  const inBetweenSelectedRange =
    selectedDatesSize === 2 &&
    dateBetweenRange(selectedDates[0], selectedDates[1], date)
  const isInvalidRangeDate =
    isInvalidDate && (inBetweenRange || inBetweenSelectedRange)

  // Get diff between dates
  const rangeDiff = selectedDates[0] ? dateDiff(selectedDates[0], date) : 0
  const rangeDiffAbs = rangeDiff && Math.abs(rangeDiff)

  // Check if is between under minRange
  const mouseUnderMinRange =
    selectedDates[0] &&
    dateMouseOver &&
    Math.abs(dateDiff(selectedDates[0], dateMouseOver)) < rangeSize.min
  const isUnderMinRange =
    inBetweenRange && mouseUnderMinRange && rangeDiffAbs < rangeSize.min

  // Check if is between over minRange
  const isOverMaxRange = inBetweenRange && rangeDiffAbs > rangeSize.max
  const mouseOver =
    dateMouseOver?.toLocaleDateString() === date.toLocaleDateString()

  // Check if is start or end date of the range
  const orderRangeDate = dateSort(
    ...excludeEqualDates(selectedDates[0], selectedDates[1] || dateMouseOver)
  )
  const isStartRangeDate =
    hasRange &&
    orderRangeDate?.[0]?.toLocaleDateString() === date.toLocaleDateString()
  const isEndRangeDate =
    hasRange &&
    orderRangeDate?.[1]?.toLocaleDateString() === date.toLocaleDateString()

  return [
    inBetweenRange && classNames?.BetweenRange,
    inBetweenSelectedRange && classNames?.BetweenSelectedRange,
    isUnderMinRange && classNames?.UnderMinRange,
    isOverMaxRange && classNames?.OverMaxRange,
    isInvalidRangeDate && classNames?.InvalidRangeDate,
    isStartRangeDate && classNames?.StartRangeDate,
    isEndRangeDate && classNames?.EndRangeDate,
    mouseOver && classNames?.MouseOverEndRange
  ]
}
