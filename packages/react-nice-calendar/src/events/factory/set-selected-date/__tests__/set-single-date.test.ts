import { setSingleDate as setSingleDateFactory } from '../set-single-date'
import { EventFactoryData, CalendarProps } from '../../../../shared-types'
import CalendarProvider from 'calendar-provider'

describe('setSingleDate', () => {
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

  it('should return the date', () => {
    const setSingleDate = setSingleDateFactory(dataMock)

    setSingleDate(new Date(1998, 4, 8))

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith(new Date(1998, 4, 8))

    setSingleDate(new Date(1998, 4, 5))

    expect(onChangeSelectedDateSpy).toHaveBeenCalledWith(new Date(1998, 4, 5))
  })

  it('should abort function when not exist onChangeSelectedDate', () => {
    dataMock.bind.props.onChangeSelectedDate = undefined
    const setSingleDate = setSingleDateFactory(dataMock)

    setSingleDate(new Date(1998, 4, 5))

    expect(onChangeSelectedDateSpy).not.toHaveBeenCalled()
  })
})
