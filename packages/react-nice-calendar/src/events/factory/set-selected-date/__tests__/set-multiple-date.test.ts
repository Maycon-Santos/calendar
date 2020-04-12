import { EventFactoryData, CalendarProps } from '../../../../shared-types'
import { setMultipleDate as setMultipleDateFactory } from '../set-multiple-date'
import CalendarProvider from 'calendar-provider'

describe('setMultipleDate', () => {
  const date = new Date(1998, 4, 8)
  const setDateMouseOverMock = jest.fn()
  const setDataToViewMock = jest.fn()
  const onChangeSelectedDateSpy = jest.fn()
  const gotoSpy = jest.fn()
  const dataMock = {} as EventFactoryData
  
  beforeEach(() => {
    const calendarProviderMock = new CalendarProvider({ date })
    
    calendarProviderMock.goto = gotoSpy

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
        },
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    Object.keys(dataMock).forEach(key => delete dataMock[key])
  })

  it('should return dates', () => {
    dataMock.bind.props.pick = 'multiple'
    const setMultipleDate = setMultipleDateFactory(dataMock)

    setMultipleDate(new Date(1998, 4, 8))

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([new Date(1998, 4, 8)])

    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8), new Date(1999, 4, 9)]

    setMultipleDate(new Date(1999, 4, 8))

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([new Date(1998, 4, 8), new Date(1999, 4, 8), new Date(1999, 4, 9)])
  })

  it('should not call onChangeSelectedDates when dates count is bigger than pickLimit', () => {
    dataMock.bind.props.pickLimit = 3
    dataMock.bind.props.selectedDate = [new Date(1998, 4, 8), new Date(1998, 4, 9), new Date(1998, 4, 10)]
    const setMultipleDate = setMultipleDateFactory(dataMock)

    setMultipleDate(new Date(1998, 4, 11))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })

  it('should abort function when not exist onChangeSelectedDate', () => {
    dataMock.bind.props.onChangeSelectedDate = undefined
    const setMultipleDate = setMultipleDateFactory(dataMock)

    setMultipleDate(new Date(1998, 4, 5))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })
})
