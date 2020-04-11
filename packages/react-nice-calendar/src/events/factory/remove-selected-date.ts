import { EventFactoryData } from '../../shared-types'
import { defaultProps } from '../../hooks/use-props'
import getSelectedDates from '../../utils/selected-dates'
import dateSort from '../../utils/date-sort'

export function removeSelectedDate (data: EventFactoryData) {
  const {
    selectedDate,
    onChangeSelectedDate,
    pick = defaultProps.pick
  } = data.bind.props

  return (date: Date) => {
    if (!onChangeSelectedDate) return

    if (pick === 'single') {
      onChangeSelectedDate(null)
    } else {
      const selectedDates = getSelectedDates(selectedDate)
      const clonedSelectedDates = [...selectedDates]
      const formattedDates = selectedDates.map(d => d.toLocaleDateString())

      clonedSelectedDates.splice(
        formattedDates.indexOf(date.toLocaleDateString()),
        1
      )

      onChangeSelectedDate(dateSort(...clonedSelectedDates))
    }
  }
}
