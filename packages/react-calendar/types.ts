import { Dispatch, SetStateAction } from 'react'
import CalendarProvider from '../calendar-provider/calendar-provider'

export type TDataToView = 'days' | 'months' | 'years'

export type TClassNameKeys = (
  | 'Container'
  | 'Header'
  | 'HeaderMonth'
  | 'HeaderYear'
  | 'HeaderYearsRange'
  | 'Days'
  | 'Day'
  | 'PrevButton'
  | 'NextButton'
  | 'HeaderText'
  | 'Body'
  | 'BodyDays'
  | 'BodyMonths'
  | 'BodyYears'
  | 'Cell'
  | 'DayCell'
  | 'MonthCell'
  | 'YearCell'
  | 'ValidDate'
  | 'InvalidDate'
  | 'DayBelongCurrentMonth'
  | 'CurrentDate'
  | 'SelectedDate'
  | 'BetweenRange'
  | 'BetweenSelectedRange'
  | 'UnderMinRange'
  | 'OverMaxRange'
  | 'InvalidRangeDate'
  | 'StartRangeDate'
  | 'EndRangeDate'
  | 'MouseOverEndRangeDate'
)

export type TClassNames = { [k in TClassNameKeys]?: string } | { [k: string]: string }

export type TFragmentProps = {
  [key: string]: any
}

export type TEventTypeUndefined = (
  | 'calendar.nextMonth'
  | 'calendar.nextYear'
  | 'calendar.nextYears'
  | 'calendar.prevMonth'
  | 'calendar.prevYear'
  | 'calendar.prevYears'
)

export type TEventTypeDate = (
  | 'calendar.goto'
  | 'calendar.addSelectedDate'
  | 'calendar.removeSelectedDate'
)

export type TEventTypeDateOrNull = (
  | 'setDateMouseOver'
)

export type TEventTypeDataToView = (
  | 'setDataToView'
)

export type TEventType = (
  | TEventTypeUndefined
  | TEventTypeDate
  | TEventTypeDateOrNull
  | TEventTypeDataToView
)

export type TEventDispatcher = <T extends TEventType>(
  type: T,
  ...date: (
    T extends TEventTypeDate ? [Date]
  : T extends TEventTypeDateOrNull ? [Date] | [null]
  : T extends TEventTypeDataToView ? [TDataToView]
  : [undefined?]
)) => any

type TPickSingle = 'single'
type TPickMultiple = 'multiple'
type TPickRange = 'range'
type TPick = TPickSingle | TPickMultiple | TPickRange

export interface ICalendarProps {
  pick?: TPick
  pickLimit?: number
  monthsDictionary?: string[]
  daysDictionary?: string[]
  classNames?: TClassNames
  startDate?: Date
  rangeSize?: {
    min: number
    max: number
  }
  filterInvalidDates?: (date: Date) => boolean
  bind?: {
    dispatchers: TEventDispatcher[]
    props: ICalendarProps
    mainCalendarProvider?: CalendarProvider
  }
  selectedDate?: Date | Date[] | null
  onChangeSelectedDate?: (
    | ((date: Date | null | Date[]) => any)
    | Dispatch<SetStateAction<Date | Date[] | null | undefined>>
  )
}

export interface ICalendarContext {
  dataToView: TDataToView
  CalendarProps: ICalendarProps
  calendarProvider: CalendarProvider
  emit: TEventDispatcher
  dateMouseOver: Date | null
}
