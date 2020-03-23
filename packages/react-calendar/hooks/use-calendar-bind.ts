import { useMemo } from 'react'
import { ICalendarProps } from '../types'

export default (): ICalendarProps['bind'] => {
  return useMemo(() => ({
    order: 0,
    dispatchers: [],
    props: {},
  }), [])
}
