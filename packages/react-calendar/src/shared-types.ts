import { Dispatch, SetStateAction, DetailedHTMLProps, HTMLAttributes } from 'react'
import CalendarProvider from '../../calendar-provider/src/calendar-provider'

export type DataToView = 'days' | 'months' | 'years'

type ClassNameKeys = (
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
  | 'Cells'
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
  | 'MouseOverEndRange'
)

export type ClassNames = { [k in ClassNameKeys]?: string } | { [k: string]: string }

type EventTypeUndefined = (
  | 'calendar.nextMonth'
  | 'calendar.nextYear'
  | 'calendar.nextYears'
  | 'calendar.prevMonth'
  | 'calendar.prevYear'
  | 'calendar.prevYears'
)

type EventTypeDate = (
  | 'calendar.goto'
  | 'calendar.addSelectedDate'
  | 'calendar.removeSelectedDate'
)

type EventTypeDateOrNull = (
  | 'setDateMouseOver'
)

type EventTypeDataToView = (
  | 'setDataToView'
)

export type EventType = (
  | EventTypeUndefined
  | EventTypeDate
  | EventTypeDateOrNull
  | EventTypeDataToView
)

export type EventDispatcher = <T extends EventType>(
  type: T,
  ...date: (
    T extends EventTypeDate ? [Date]
  : T extends EventTypeDateOrNull ? [Date] | [null]
  : T extends EventTypeDataToView ? [DataToView]
  : [undefined?]
)) => any

type PickSingle = 'single'
type PickMultiple = 'multiple'
type PickRange = 'range'
export type Pick = PickSingle | PickMultiple | PickRange

export type CustomOnClickEvent = { originalEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>, originalHandler?: () => void }
export type CustomOnClick = (event: CustomOnClickEvent) => void

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type ButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export type ButtonPropsCustomOnClick = {
  [P in keyof ButtonProps]: P extends 'onClick' ? CustomOnClick : ButtonProps[P]
}

export type BindProp = {
  owners: Symbol[]
  props: CalendarProps
  shared?: {
    mainCalendarProvider: CalendarProvider
    dispatchers: EventDispatcher[]
  }
}

export type Bind = {
  order: number
  props: CalendarProps
  shared?: BindProp['shared']
}

export interface CalendarProps {
  pick?: Pick
  pickLimit?: number
  monthsDictionary?: string[]
  daysDictionary?: string[]
  classNames?: ClassNames
  startDate?: Date
  rangeSize?: {
    min: number
    max: number
  }
  filterInvalidDates?: (date: Date) => boolean
  bind?: BindProp
  selectedDate?: Date | Date[] | null
  onChangeSelectedDate?: (
    | ((date: Date | null | Date[]) => any)
    | Dispatch<SetStateAction<Date | Date[] | null | undefined>>
  )
  HeaderProps?: DivProps
  PrevButtonProps?: ButtonPropsCustomOnClick
  NextButtonProps?: ButtonPropsCustomOnClick
  HeaderTextProps?: ButtonPropsCustomOnClick
  DaysProps?: DivProps
  DayProps?: DivProps
  BodyProps?: DivProps
  CellsProps?: DivProps
  DateProps?: ButtonPropsCustomOnClick
  MonthProps?: ButtonPropsCustomOnClick
  YearProps?: ButtonPropsCustomOnClick
}

export interface CalendarContext {
  dataToView: DataToView
  bind: Bind
  calendarProvider: CalendarProvider
  emitEvent: EventDispatcher
  dateMouseOver: Date | null
}
