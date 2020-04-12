import { EventFactoryData, CalendarProps } from '../../../../shared-types'
import { setRangeDate as setRangeDateFactory } from '../set-range-date'
import CalendarProvider from 'calendar-provider'

describe('setRangeDate', () => {
  const date = new Date(1998, 4, 8)
  const setDateMouseOverMock = jest.fn()
  const setDataToViewMock = jest.fn()
  const onChangeSelectedDateSpy = jest.fn()
  const dataMock = {} as EventFactoryData

  beforeEach(() => {
    const calendarProviderMock = new CalendarProvider({ date })

    Object.assign<EventFactoryData, EventFactoryData>(dataMock, {
      calendarProvider: calendarProviderMock,
      setDateMouseOver: setDateMouseOverMock,
      setDataToView: setDataToViewMock,
      bind: {
        order: 0,
        props: {
          onChangeSelectedDate: onChangeSelectedDateSpy
        } as CalendarProps,
        shared: {
          mainCalendarProvider: calendarProviderMock,
          dispatchers: []
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    Object.keys(dataMock).forEach(key => delete dataMock[key])
  })

  it('should return dates', () => {
    dataMock.bind.props.pick = 'multiple'
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 8))

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([new Date(1998, 4, 8)])

    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8)]

    setRangeDate(new Date(1999, 4, 8))

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([
      new Date(1998, 4, 8),
      new Date(1999, 4, 8)
    ])
  })

  it('should not call onChangeSelectedDates when dates count is bigger than 2', () => {
    dataMock.bind.props.pickLimit = 3
    dataMock.bind.props.selectedDate = [
      new Date(1998, 4, 8),
      new Date(1998, 4, 9)
    ]
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 10))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })

  it('should not call onChangeSelectedDates when have invalid date between range', () => {
    dataMock.bind.props.filterInvalidDates = date => date.getDate() === 9
    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8)]
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 9))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })

  it('should not call onChangeSelectDates when date is less than rangeSize.min', () => {
    dataMock.bind.props.rangeSize = { min: 3, max: 10 }
    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8)]
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 9))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })

  it('should call onChangeSelectDates when date is bigger than rangeSize.min', () => {
    dataMock.bind.props.rangeSize = { min: 3, max: 10 }
    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8)]
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 11))

    expect(onChangeSelectedDateSpy).toHaveBeenCalled()
  })

  it('should not call onChangeSelectDates when date is bigger than rangeSize.max', () => {
    dataMock.bind.props.rangeSize = { min: 3, max: 10 }
    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8)]
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 19))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })

  it('should call onChangeSelectDates when date is less than rangeSize.max', () => {
    dataMock.bind.props.rangeSize = { min: 3, max: 10 }
    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8)]
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 15))

    expect(onChangeSelectedDateSpy).toHaveBeenCalled()
  })

  it('should abort function when not exist onChangeSelectedDate', () => {
    dataMock.bind.props.onChangeSelectedDate = undefined
    const setRangeDate = setRangeDateFactory(dataMock)

    setRangeDate(new Date(1998, 4, 5))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })
})
