import { EventFactoryData, CalendarProps } from '../../shared-types'
import * as setSelectedDateModule from '../factory/set-selected-date'
import * as removeSelectedDateModule from '../factory/remove-selected-date'
import * as setDataToViewModule from '../factory/set-data-to-view'
import eventsFactory from '../events'
import CalendarProvider from 'calendar-provider'

describe('eventsFactory', () => {
  const date = new Date(1998, 4, 8)
  const setDateMouseOverMock = jest.fn()
  const onChangeSelectedDateSpy = jest.fn()
  const dataMock = {} as EventFactoryData

  Object.defineProperty(setSelectedDateModule, 'setSelectedDate', {
    value: jest.fn(() => jest.fn())
  })

  Object.defineProperty(removeSelectedDateModule, 'removeSelectedDate', {
    value: jest.fn(() => jest.fn())
  })

  Object.defineProperty(setDataToViewModule, 'setDataToView', {
    value: jest.fn(() => jest.fn())
  })

  beforeEach(() => {
    const calendarProviderMock = new CalendarProvider({ date })

    calendarProviderMock.prevMonth = jest.fn()
    calendarProviderMock.nextMonth = jest.fn()
    calendarProviderMock.prevYear = jest.fn()
    calendarProviderMock.nextYear = jest.fn()
    calendarProviderMock.prevYears = jest.fn()
    calendarProviderMock.nextYears = jest.fn()
    calendarProviderMock.goto = jest.fn()

    Object.assign<EventFactoryData, EventFactoryData>(dataMock, {
      calendarProvider: calendarProviderMock,
      setDateMouseOver: setDateMouseOverMock,
      setDataToView: jest.fn(() => jest.fn()),
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

  it('should call calendar.prevMonth', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.prevMonth')

    expect(dataMock.calendarProvider.prevMonth).toHaveBeenCalled()
  })

  it('should call calendar.nextMonth', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.nextMonth')

    expect(dataMock.calendarProvider.nextMonth).toHaveBeenCalled()
  })

  it('should call calendar.prevYear', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.prevYear')

    expect(dataMock.calendarProvider.prevYear).toHaveBeenCalled()
  })

  it('should call calendar.nextYear', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.nextYear')

    expect(dataMock.calendarProvider.nextYear).toHaveBeenCalled()
  })

  it('should call calendar.prevYears', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.prevYears')

    expect(dataMock.calendarProvider.prevYears).toHaveBeenCalled()
  })

  it('should call calendar.nextYears', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.nextYears')

    expect(dataMock.calendarProvider.nextYears).toHaveBeenCalled()
  })

  it('should call calendar.goto', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('calendar.goto', new Date(1998, 4, 8))

    expect(dataMock.calendarProvider.goto).toHaveBeenCalledWith(
      new Date(1998, 4, 8)
    )
  })

  it('should call setDateMouseOver width date', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('setDateMouseOver', new Date(1998, 4, 8))

    expect(setDateMouseOverMock).toHaveBeenCalledWith(new Date(1998, 4, 8))
  })

  it('should call setDateMouseOver width null', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('setDateMouseOver', null)

    expect(setDateMouseOverMock).toHaveBeenCalledWith(null)
  })

  it('should call setSelectedDate', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('setSelectedDate', new Date(1998, 4, 8))

    const setSelectedDateMock = setSelectedDateModule.setSelectedDate as jest.Mock

    expect(setSelectedDateMock.mock.results[0].value).toHaveBeenCalledWith(
      new Date(1998, 4, 8)
    )
  })

  it('should call removeSelectedDate', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('removeSelectedDate', new Date(1998, 4, 8))

    const removeSelectedDateMock = removeSelectedDateModule.removeSelectedDate as jest.Mock

    expect(removeSelectedDateMock.mock.results[0].value).toHaveBeenCalledWith(
      new Date(1998, 4, 8)
    )
  })

  it('should call setDataToView with days', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('setDataToView', 'days')

    const setDataToViewMock = setDataToViewModule.setDataToView as jest.Mock

    expect(setDataToViewMock.mock.results[0].value).toHaveBeenCalledWith('days')
  })

  it('should call setDataToView with months', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('setDataToView', 'months')

    const setDataToViewMock = setDataToViewModule.setDataToView as jest.Mock

    expect(setDataToViewMock.mock.results[0].value).toHaveBeenCalledWith(
      'months'
    )
  })

  it('should call setDataToView with years', () => {
    const dispatcher = eventsFactory(dataMock)()

    dispatcher('setDataToView', 'years')

    const setDataToViewMock = setDataToViewModule.setDataToView as jest.Mock

    expect(setDataToViewMock.mock.results[0].value).toHaveBeenCalledWith(
      'years'
    )
  })
})
