import {
  Dispatch,
  SetStateAction,
  DetailedHTMLProps,
  HTMLAttributes
} from 'react'
import CalendarProvider from 'calendar-provider'

export type DataToView = 'days' | 'months' | 'years'

type ClassNameKeys =
  | 'Container'
  | 'CalendarBinded'
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
  | 'InvalidDateBetweenRange'
  | 'StartRangeDate'
  | 'EndRangeDate'
  | 'MouseOverEndRange'

export type ClassNames = { [k in ClassNameKeys]?: string } | { [key: string]: string }

export type EventName =
  | 'calendar.nextMonth'
  | 'calendar.nextYear'
  | 'calendar.nextYears'
  | 'calendar.prevMonth'
  | 'calendar.prevYear'
  | 'calendar.prevYears'
  | 'calendar.goto'
  | 'setSelectedDate'
  | 'removeSelectedDate'
  | 'setDateMouseOver'
  | 'setDataToView'

export type EventDispatcher = <T extends EventName>(
  name: T,
  ...date: T extends 'calendar.goto' | 'setSelectedDate' | 'removeSelectedDate'
    ? [Date]
    : T extends 'setDateMouseOver'
    ? [Date] | [null]
    : T extends 'setDataToView'
    ? [DataToView]
    : T extends
        | 'calendar.nextMonth'
        | 'calendar.nextYear'
        | 'calendar.nextYears'
        | 'calendar.prevMonth'
        | 'calendar.prevYear'
        | 'calendar.prevYears'
    ? [undefined?]
    : []
) => any

type PickSingle = 'single'
type PickMultiple = 'multiple'
type PickRange = 'range'
export type Pick = PickSingle | PickMultiple | PickRange

export type CustomOnClickEvent = {
  originalEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  originalHandler?: () => void
}
export type CustomOnClick = (event: CustomOnClickEvent) => void

export type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
type ButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
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

export interface EventFactoryData {
  calendarProvider: CalendarProvider
  setDateMouseOver: Dispatch<SetStateAction<Date | null>>
  setDataToView: Dispatch<SetStateAction<DataToView>>
  bind: {
    order: number
    props: CalendarProps
    shared?: {
      mainCalendarProvider: CalendarProvider
      dispatchers: EventDispatcher[]
    }
  }
}

export type Bind = {
  order: number
  props: CalendarProps
  shared?: BindProp['shared']
}

export type OnChangeSelectedDate =
  | ((date: Date | null | Date[]) => any)
  | Dispatch<SetStateAction<Date | Date[] | null | undefined>>

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
  onChangeSelectedDate?: OnChangeSelectedDate
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
