import { DataToView, EventFactoryData } from '../../shared-types'

export function setDataToView (data: EventFactoryData) {
  const {
    calendarProvider,
    setDataToView,
    bind: { order, shared }
  } = data

  return (dataToView: DataToView) => {
    if (order > 0 && shared?.mainCalendarProvider) {
      const { mainCalendarProvider } = shared
      const { backwardYears, forwardYears } = mainCalendarProvider
      const date = new Date(mainCalendarProvider.dateToView)

      if (dataToView === 'days') {
        date.setMonth(date.getMonth() + order)
        calendarProvider.goto(date)
      }

      if (dataToView === 'months') {
        date.setFullYear(date.getFullYear() + order)
        calendarProvider.goto(date)
      }

      if (dataToView === 'years') {
        const years = mainCalendarProvider.years
        date.setFullYear(
          years[backwardYears].date.getFullYear() +
            (backwardYears + forwardYears) * order
        )
        calendarProvider.goto(date)
      }
    }

    setDataToView(dataToView)
  }
}
