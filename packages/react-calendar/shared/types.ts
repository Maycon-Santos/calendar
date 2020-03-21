import CalendarProvider from '../../calendar-provider/calendar-provider'

export type TDataToView = 'days' | 'months' | 'years'

export type TClassNameKeys = (
  | 'Container'
  | 'Header'
  | 'Month'
  | 'Year'
  | 'YearsRange'
  | 'Days'
  | 'Day'
  | 'PrevButton'
  | 'NextButton'
  | 'HeaderText'
  | 'Body'
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

export type TEventTypeCalendar = (
  | 'calendar.addSelectedDate'
  | 'calendar.removeSelectedDate'
  | 'calendar.goto'
  | 'calendar.nextMonth'
  | 'calendar.nextYear'
  | 'calendar.nextYears'
  | 'calendar.prevMonth'
  | 'calendar.prevYear'
  | 'calendar.prevYears'
)
export type TEventType = 'setDataToView' | 'setEndDateMouseOver' | TEventTypeCalendar
export type TEventParams = TDataToView | Date | undefined | null

export type TEventDispatcher = (type: TEventType, params?: TEventParams) => void

export type TPick = 'single' | 'multiple' | 'range'

export type TRangeSize = {
  min: number
  max: number
}

export type TFilterInvalidDates = (date: Date) => boolean

export interface IOnChange {
  
}

export interface ICalendarProps {
  pick?: TPick
  pickLimit?: number
  dateProps?: TFragmentProps
  monthProps?: TFragmentProps
  yearProps?: TFragmentProps
  monthsDictionary?: string[]
  daysDictionary?: string[]
  classNames?: TClassNames
  startDate?: Date
  onChange?: () => void
  rangeSize?: TRangeSize
  filterInValidDates?: TFilterInvalidDates
  bind?: {
    set: TEventDispatcher[]
    pick?: TPick
    pickLimit?: number
    rangeSize?: TRangeSize
    mainCalendarProvider?: CalendarProvider
    filterInvalidDates?: TFilterInvalidDates
  }
}

export interface ICalendarContext {
  dataToView: TDataToView
  CalendarProps: ICalendarProps
  calendarProvider: CalendarProvider
  emit: TEventDispatcher
  endDateMouseOver: Date | null
}
