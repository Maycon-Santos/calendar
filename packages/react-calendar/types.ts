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

export interface ICalendarProps {
  pick?: 'single' | 'multiple' | 'range'
  pickLimit?: number
  monthsDictionary?: string[]
  daysDictionary?: string[]
  classNames?: TClassNames
  startDate?: Date
  onChangeSelectedDate?: (date: Date[] | Date | null) => void
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
}

export interface ICalendarContext {
  dataToView: TDataToView
  CalendarProps: ICalendarProps
  calendarProvider: CalendarProvider
  emit: TEventDispatcher
  dateMouseOver: Date | null
}
