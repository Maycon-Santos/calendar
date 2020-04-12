import { EventFactoryData, CalendarProps } from '../../../shared-types'
import { removeSelectedDate as removeSelectedDateFactory } from '../remove-selected-date'
import CalendarProvider from 'calendar-provider'

describe('removeSelectedDate', () => {
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

  it('should remove selected date when pick is single', () => {
    dataMock.bind.props.pick = 'single'
    dataMock.bind.props.selectedDate = new Date(1998, 4, 8)
    const removeSelectedDate = removeSelectedDateFactory(dataMock)

    removeSelectedDate(dataMock.bind.props.selectedDate)

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith(null)
  })

  it('should remove selected date when pick is multiple', () => {
    dataMock.bind.props.pick = 'multiple'
    dataMock.bind.props.selectedDate = [
      new Date(1998, 4, 8),
      new Date(1998, 4, 15),
      new Date(1998, 4, 5),
      new Date(1998, 4, 9)
    ]
    const removeSelectedDate = removeSelectedDateFactory(dataMock)

    removeSelectedDate(dataMock.bind.props.selectedDate[0])

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([
      new Date(1998, 4, 5),
      new Date(1998, 4, 9),
      new Date(1998, 4, 15)
    ])

    dataMock.bind.props.selectedDate = [
      new Date(1998, 4, 5),
      new Date(1998, 4, 9),
      new Date(1998, 4, 15)
    ]

    removeSelectedDate(dataMock.bind.props.selectedDate[0])

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([
      new Date(1998, 4, 9),
      new Date(1998, 4, 15)
    ])

    dataMock.bind.props.selectedDate = [
      new Date(1998, 4, 9),
      new Date(1998, 4, 15)
    ]

    removeSelectedDate(dataMock.bind.props.selectedDate[0])

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([
      new Date(1998, 4, 15)
    ])

    dataMock.bind.props.selectedDate = [new Date(1998, 4, 15)]

    removeSelectedDate(dataMock.bind.props.selectedDate[0])

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([])
  })

  it('should remove selected date when pick is range', () => {
    dataMock.bind.props.pick = 'range'
    dataMock.bind.props.selectedDate = [
      new Date(1998, 4, 8),
      new Date(1998, 4, 15)
    ]
    const removeSelectedDate = removeSelectedDateFactory(dataMock)

    removeSelectedDate(dataMock.bind.props.selectedDate[0])

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([
      new Date(1998, 4, 15)
    ])

    dataMock.bind.props.selectedDate = [new Date(1998, 4, 15)]

    removeSelectedDate(dataMock.bind.props.selectedDate[0])

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith([])
  })

  it('should abort function when not exist onChangeSelectedDate', () => {
    dataMock.bind.props.onChangeSelectedDate = undefined
    const removeSelectedDate = removeSelectedDateFactory(dataMock)

    removeSelectedDate(new Date())

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })
})
