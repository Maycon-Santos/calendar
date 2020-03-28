import { useMemo } from 'react'
import { CalendarProps } from '../shared-types'

export default (): CalendarProps['bind'] => {
  return useMemo(() => ({
    order: 0,
    dispatchers: [],
    props: {},
  }), [])
}
