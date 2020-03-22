import { useMemo } from 'react'

export default () => {
  return useMemo(() => ({
    order: 0,
    dispatchers: [],
    props: {},
  }), [])
}
