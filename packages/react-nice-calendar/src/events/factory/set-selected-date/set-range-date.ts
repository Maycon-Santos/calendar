import { EventFactoryData } from '../../../shared-types'
import getSelectedDates from '../../../utils/selected-dates'
import { defaultProps } from '../../../hooks/use-props'
import datesDiff from '../../../utils/dates-diff'
import getDatesRange from '../../../utils/get-dates-range'
import dateSort from '../../../utils/date-sort'

export function setRangeDate (data: EventFactoryData) {
  return (date: Date) => {
    const {
      selectedDate,
      onChangeSelectedDate,
      rangeSize = defaultProps.rangeSize,
      filterInvalidDates
    } = data.bind.props

    if (!onChangeSelectedDate) return
    const selectedDates = getSelectedDates(selectedDate)

    switch (selectedDates.length) {
      case 0: {
        onChangeSelectedDate([date])
        break
      }
      case 1: {
        const rangeDiff = datesDiff(selectedDates[0], date)
        const rangeDiffAbs = Math.abs(rangeDiff)
        const datesRange = getDatesRange(selectedDates[0], date)
        const isValid =
          !filterInvalidDates ||
          !datesRange.find(date => filterInvalidDates(date))

        if (
          isValid &&
          rangeDiffAbs >= rangeSize.min &&
          rangeDiffAbs <= rangeSize.max
        ) {
          onChangeSelectedDate(dateSort(...selectedDates, date))
          break
        }
      }
    }
  }
}
