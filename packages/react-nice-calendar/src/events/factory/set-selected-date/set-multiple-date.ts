import { defaultProps } from '../../../hooks/use-props'
import { EventFactoryData } from '../../../shared-types'
import getSelectedDates from '../../../utils/selected-dates'
import dateSort from '../../../utils/date-sort'

export function setMultipleDate (data: EventFactoryData) {
  const {
    selectedDate,
    onChangeSelectedDate,
    pickLimit = defaultProps.pickLimit
  } = data.bind.props

  return (date: Date) => {
    if (!onChangeSelectedDate) return
    const selectedDates = getSelectedDates(selectedDate)

    if (selectedDates.length < pickLimit) {
      onChangeSelectedDate(dateSort(...selectedDates, date))
    }
  }
}
