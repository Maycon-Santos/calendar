import { useMemo } from 'react'
import { CalendarProps } from '../shared-types'

export default (): CalendarProps['bind'] => {
  return useMemo(
    () => ({
      owners: [],
      props: {}
    }),
    []
  )
}
