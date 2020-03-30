import { CalendarProps } from '../../shared-types'
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
): (string | false | null | undefined)[]
export {}
