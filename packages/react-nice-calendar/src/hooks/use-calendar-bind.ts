import { useMemo } from 'react'
import { CalendarProps } from '../shared-types'

export default function useCalendarBind (): CalendarProps['bind'] {
  return useMemo(
    () => ({
      owners: [],
      props: {}
    }),
    []
  )
}
