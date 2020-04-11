import { EventFactoryData } from '../../../shared-types'

export function setSingleDate (data: EventFactoryData) {
  const { onChangeSelectedDate } = data.bind.props

  return (date: Date) => {
    if (onChangeSelectedDate) {
      onChangeSelectedDate(date)
    }
  }
}
