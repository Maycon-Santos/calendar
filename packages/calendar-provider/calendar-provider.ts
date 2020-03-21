type DaysType = {
  date: Date
  day: number
  belongCurrentMonth: boolean
};

type MonthsType = {
  date: Date
  month: number
}

type YearType = {
  date: Date
  year: number
}

interface OptionsInterface {
  date?: Date
  backwardYears?: number
  forwardYears?: number
}

export default class CalendarProvider {
  private _selectedDates: Date[] = []
  private _dateToView: Date
  private _startDate: Date
  private _backwardYears: number
  private _forwardYears: number
  public onChange: () => void = () => {}

  constructor (options?: OptionsInterface) {
    const {
      date = new Date(),
      backwardYears = 8,
      forwardYears = 8,
    } = options || {}

    this._dateToView = new Date(date)
    this._startDate = new Date(date)
    this._backwardYears = backwardYears
    this._forwardYears = forwardYears
  }

  public prevMonth (): void {
    this._dateToView.setMonth(this._dateToView.getMonth() - 1)
    this.onChange()
  }

  public nextMonth (): void {
    this._dateToView.setMonth(this._dateToView.getMonth() + 1)
    this.onChange()
  }

  public prevYear (): void {
    this._dateToView.setFullYear(this._dateToView.getFullYear() - 1)
    this.onChange()
  }

  public nextYear (): void {
    this._dateToView.setFullYear(this._dateToView.getFullYear() + 1)
    this.onChange()
  }

  public prevYears (): void {
    const year = this._dateToView.getFullYear() - (this._backwardYears + this._forwardYears)
    this._dateToView.setFullYear(year)
    this.onChange()
  }

  public nextYears (): void {
    const year = this._dateToView.getFullYear() + (this._backwardYears + this._forwardYears)
    this._dateToView.setFullYear(year)
    this.onChange()
  }

  public resetDateToView (): void {
    this._dateToView = this._selectedDates[0] || this._startDate
    this.onChange()
  }

  public addSelectedDate (date: Date) {
    this._selectedDates.push(date)
    this.onChange()
  }

  public removeSelectedDate (index: number) {
    this._selectedDates.splice(isNaN(index) ? this._selectedDates.length - 1 : index, 1)
    this.onChange()
  }

  public resetSelectedDates () {
    this._selectedDates.splice(0, this._selectedDates.length)
    this.onChange()
  }

  public goto (date: Date) {
    this._dateToView = date
    this.onChange()
  }

  public get dateToView () {
    return this._dateToView
  }

  public get selectedDates (): Date[] {
    return this._selectedDates
  }

  public get month (): number { return this._dateToView.getMonth() }

  public get year (): number { return this._dateToView.getFullYear() }

  public get days (): DaysType[] {
    const days = Array(42).fill(null)

    const date = new Date(this._dateToView)
    const currentMonth = date.getMonth()

    date.setDate(1)
    const day = date.getDay()
    if (date.getDate() - day <= 0) {
      date.setDate(0)
      date.setDate(date.getDate() - day + 1)
    }

    for (const i in days) {
      days[i] = {
        date: new Date(date),
        day: date.getDate(),
        belongCurrentMonth: currentMonth === date.getMonth(),
      }

      date.setDate(date.getDate() + 1)
    }

    return days
  }

  public get months (): MonthsType[] {
    const months = Array(12).fill(null)
    const currentMonth = new Date(this._dateToView)
    currentMonth.setDate(1)
    currentMonth.setMonth(0)

    for (const i in months) {
      months[i] = {
        date: new Date(currentMonth),
        month: currentMonth.getMonth(),
      }

      currentMonth.setMonth(currentMonth.getMonth() + 1)
    }

    return months
  }

  public get years (): YearType[] {
    const years = Array(Math.abs(this._backwardYears) + this._forwardYears).fill(null)
    const currentYear = new Date(this._dateToView)
    currentYear.setDate(1)
    currentYear.setMonth(0)
    currentYear.setFullYear(currentYear.getFullYear() - this._backwardYears)

    for (const i in years) {
      years[i] = {
        date: new Date(currentYear),
        year: currentYear.getFullYear(),
      }

      currentYear.setFullYear(currentYear.getFullYear() + 1)
    }

    return years
  }
}
