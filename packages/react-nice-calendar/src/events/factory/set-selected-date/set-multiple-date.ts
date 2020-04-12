import { defaultProps } from '../../../hooks/use-props'
import { EventFactoryData } from '../../../shared-types'
import getSelectedDates from '../../../utils/selected-dates'
import dateSort from '../../../utils/date-sort'

export function setMultipleDate (data: EventFactoryData) {
  return (date: Date) => {
    const {
      selectedDate,
      onChangeSelectedDate,
      pickLimit = defaultProps.pickLimit
    } = data.bind.props

    if (!onChangeSelectedDate) return
    const selectedDates = getSelectedDates(selectedDate)

    if (selectedDates.length < pickLimit) {
      onChangeSelectedDate(dateSort(...selectedDates, date))
    }
  }
}
