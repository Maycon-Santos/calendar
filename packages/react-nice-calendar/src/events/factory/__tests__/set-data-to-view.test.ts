import { setDataToView as setDataToViewFactory } from '../set-data-to-view'
import CalendarProvider from 'calendar-provider'
import { CalendarProps, EventFactoryData } from '../../../shared-types'

describe('setDataToView', () => {
  const date = new Date(1998, 4, 8)
  const setDateMouseOverMock = jest.fn()
  const setDataToViewMock = jest.fn()
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
        props: {} as CalendarProps,
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

  test.each([0, 1, 2, 3])(
    'should call goto function to correct days for order %i',
    order => {
      dataMock.bind.order = order
      const setDataToView = setDataToViewFactory(dataMock)
      const dateGoto = new Date(date)

      dateGoto.setDate(15)
      dateGoto.setMonth(dateGoto.getMonth() + order)

      setDataToView('days')

      if (order > 0) {
        expect(gotoSpy).toHaveBeenLastCalledWith(dateGoto)
      } else {
        expect(gotoSpy).not.toHaveBeenCalled()
      }

      expect(setDataToViewMock).toHaveBeenCalledWith('days')
    }
  )

  test.each([0, 1, 2, 3])(
    'should call goto function to correct months for order %i',
    order => {
      dataMock.bind.order = order
      const setDataToView = setDataToViewFactory(dataMock)
      const dateGoto = new Date(date)

      dateGoto.setDate(15)
      dateGoto.setFullYear(dateGoto.getFullYear() + order)

      setDataToView('months')

      if (order > 0) {
        expect(gotoSpy).toHaveBeenLastCalledWith(dateGoto)
      } else {
        expect(gotoSpy).not.toHaveBeenCalled()
      }

      expect(setDataToViewMock).toHaveBeenCalledWith('months')
    }
  )

  test.each([0, 1, 2, 3])(
    'should call goto function to correct years for order %i',
    order => {
      dataMock.bind.order = order
      const setDataToView = setDataToViewFactory(dataMock)
      const dateGoto = new Date(date)

      if (!dataMock.bind.shared) {
        throw Error('Shared property do not exists')
      }

      const { mainCalendarProvider } = dataMock.bind.shared
      const { backwardYears, forwardYears } = mainCalendarProvider
      const years = mainCalendarProvider.years

      dateGoto.setDate(15)
      dateGoto.setFullYear(
        years[backwardYears].date.getFullYear() +
          (backwardYears + forwardYears) * order
      )

      setDataToView('years')

      if (order > 0) {
        expect(gotoSpy).toHaveBeenLastCalledWith(dateGoto)
      } else {
        expect(gotoSpy).not.toHaveBeenCalled()
      }

      expect(setDataToViewMock).toHaveBeenCalledWith('years')
    }
  )

  test.each([0, 1, 2, 3])(
    'should call only setDataToView original when not exists mainCalendarProvider for order %i when call setDataToView with days',
    order => {
      dataMock.bind.order = order
      delete dataMock.bind.shared
      const setDataToView = setDataToViewFactory(dataMock)

      setDataToView('days')

      expect(gotoSpy).not.toHaveBeenCalled()
      expect(setDataToViewMock).toHaveBeenCalled()
    }
  )

  test.each([0, 1, 2, 3])(
    'should call only setDataToView original when not exists mainCalendarProvider for order %i when call setDataToView with months',
    order => {
      dataMock.bind.order = order
      delete dataMock.bind.shared
      const setDataToView = setDataToViewFactory(dataMock)

      setDataToView('months')

      expect(gotoSpy).not.toHaveBeenCalled()
      expect(setDataToViewMock).toHaveBeenCalled()
    }
  )

  test.each([0, 1, 2, 3])(
    'should call only setDataToView original when not exists mainCalendarProvider for order %i when call setDataToView with years',
    order => {
      dataMock.bind.order = order
      delete dataMock.bind.shared
      const setDataToView = setDataToViewFactory(dataMock)

      setDataToView('years')

      expect(gotoSpy).not.toHaveBeenCalled()
      expect(setDataToViewMock).toHaveBeenCalled()
    }
  )
})
