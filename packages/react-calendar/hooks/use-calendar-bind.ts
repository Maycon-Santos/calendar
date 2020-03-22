import { useMemo } from 'react'

export default () => {
  return {
    dispatchers: useMemo(() => [], []),
    props: useMemo(() => ({}), []),
  }
}
