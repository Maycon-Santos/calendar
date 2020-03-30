import { useMemo } from 'react'

const mounted: Symbol[] = []

export default function useWillMount <T>(callback: () => T) {
  const mountedSymbol = useMemo(() => Symbol('Mounted'), [])

  if (!mounted.includes(mountedSymbol)) {
    callback()
    mounted.push(mountedSymbol)
  }
}
