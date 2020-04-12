import { EventFactoryData } from '../../../shared-types'
import { defaultProps } from '../../../hooks/use-props'
import { setSingleDate } from './set-single-date'
import { setMultipleDate } from './set-multiple-date'
import { setRangeDate } from './set-range-date'

export function addSelectedDate (data: EventFactoryData) {
  return (date: Date) => {
    const { pick = defaultProps.pick } = data.bind.props

    const methods = {
      single: setSingleDate(data),
      multiple: setMultipleDate(data),
      range: setRangeDate(data)
    }
    
    methods[pick](date)
  }
}
