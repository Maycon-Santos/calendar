import { useMemo } from 'react'
import { EventDispatcher } from '../shared-types'
import dispatcherFactory, { DispatcherFactoryData } from '../dispatcher-factory'

export default function useDispatcher (args: DispatcherFactoryData): EventDispatcher {
  const {
    bind: {
      order,
      shared
    }
  } = args

  const dispatcher: EventDispatcher = useMemo(() => dispatcherFactory(args), [])

  if (shared && !shared.dispatchers[order]) shared.dispatchers[order] = dispatcher

  return dispatcher
}
