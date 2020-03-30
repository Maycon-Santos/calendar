import { useState, useCallback } from 'react'

export default function useForceUpdate () {
  const [, forceUpdate] = useState()
  return useCallback(() => forceUpdate({}), [])
}