declare type DaysType = {
  date: Date
  day: number
  belongCurrentMonth: boolean
}
declare type MonthsType = {
  date: Date
  month: number
}
declare type YearType = {
  date: Date
  year: number
}
interface OptionsInterface {
  date?: Date
  backwardYears?: number
  forwardYears?: number
}
export default class CalendarProvider {
  private _dateToView
  private _startDate
  private _backwardYears
  private _forwardYears
  onChange: (...args: any) => any
  constructor (options?: OptionsInterface)
  get backwardYears (): number
  get forwardYears (): number
  prevMonth: () => void
  nextMonth: () => void
  prevYear: () => void
  nextYear: () => void
  prevYears: () => void
  nextYears: () => void
  resetDateToView (): void
  goto: (date: Date) => void
  get dateToView (): Date
  get month (): number
  get year (): number
  get days (): DaysType[]
  get months (): MonthsType[]
  get years (): YearType[]
}
export {}
