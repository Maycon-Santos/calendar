import CalendarProvider from '../calendar-provider'

describe('Calendar Provider', () => {
 

  it('should returns all days of the mounth', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    expect(calendar.days).toMatchSnapshot()
  })

  it('should returns all months of the year', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    expect(calendar.months).toMatchSnapshot()
  })

  it('should returns years around', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    expect(calendar.months).toMatchSnapshot()
  })

  it('should go to next month', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    calendar.nextMonth()
    expect(calendar.days).toMatchSnapshot()
  })

  it('should go to previous month', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    calendar.prevMonth()
    expect(calendar.days).toMatchSnapshot()
  })

  it('should go to next year', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    calendar.nextYear()
    expect(calendar.months).toMatchSnapshot()
  })

  it('should go to previous year', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    calendar.prevYear()
    expect(calendar.months).toMatchSnapshot()
  })

  it('should go to next years range', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    calendar.nextYears()
    expect(calendar.years).toMatchSnapshot()
  })

  it('should go to previous years range', () => {
    const calendar = new CalendarProvider({
      date: new Date(1998, 4, 8),
      backwardYears: 8,
      forwardYears: 8
    })
    calendar.prevYears()
    expect(calendar.years).toMatchSnapshot()
  })
})
