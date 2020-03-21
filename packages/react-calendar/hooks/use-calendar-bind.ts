import { useMemo } from 'react'

export default () => {
  return { set: useMemo(() => [], []) }
}
