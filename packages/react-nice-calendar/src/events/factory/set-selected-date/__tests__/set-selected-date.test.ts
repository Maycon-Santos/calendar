import { EventFactoryData, CalendarProps } from '../../../../shared-types'
import { setSelectedDate as setSelectedDateFactory } from '../index'
import * as setSingleDateModule from '../set-single-date'
import * as setMultipleDateModule from '../set-multiple-date'
import * as setRangeDateModule from '../set-range-date'
import CalendarProvider from 'calendar-provider'

describe('setSelectedDate', () => {
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

  it('should call setSingleDate', () => {
    dataMock.bind.props.pick = 'single'

    const setSelectedDate = setSelectedDateFactory(dataMock)
    const newSelectedDate = new Date(1998, 4, 8)

    const setSingleDateSpy = jest.fn(() => jest.fn())
    Object.defineProperty(setSingleDateModule, 'setSingleDate', {
      value: setSingleDateSpy
    })

    setSelectedDate(newSelectedDate)

    expect(setSingleDateSpy).toHaveBeenCalledWith(dataMock)
    expect(setSingleDateSpy.mock.results[0].value).toHaveBeenCalledWith(
      newSelectedDate
    )
  })

  it('should call setMultipleDate', () => {
    dataMock.bind.props.pick = 'multiple'

    const setSelectedDate = setSelectedDateFactory(dataMock)
    const newSelectedDate = new Date(1998, 4, 8)

    const setMultipleDateSpy = jest.fn(() => jest.fn())
    Object.defineProperty(setMultipleDateModule, 'setMultipleDate', {
      value: setMultipleDateSpy
    })

    setSelectedDate(newSelectedDate)

    expect(setMultipleDateSpy).toHaveBeenCalledWith(dataMock)
    expect(setMultipleDateSpy.mock.results[0].value).toHaveBeenCalledWith(
      newSelectedDate
    )
  })

  it('should call setRangeDate', () => {
    dataMock.bind.props.pick = 'range'

    const setSelectedDate = setSelectedDateFactory(dataMock)
    const newSelectedDate = new Date(1998, 4, 8)

    const setRangeDateSpy = jest.fn(() => jest.fn())
    Object.defineProperty(setRangeDateModule, 'setRangeDate', {
      value: setRangeDateSpy
    })

    setSelectedDate(newSelectedDate)

    expect(setRangeDateSpy).toHaveBeenCalledWith(dataMock)
    expect(setRangeDateSpy.mock.results[0].value).toHaveBeenCalledWith(
      newSelectedDate
    )
  })
})
