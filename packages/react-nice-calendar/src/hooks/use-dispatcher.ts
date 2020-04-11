import { useMemo } from 'react'
import { EventDispatcher, EventFactoryData } from '../shared-types'
import eventsFactory from '../events'

export default function useDispatcher (
  data: EventFactoryData
): EventDispatcher {
  const {
    bind: { order, shared }
  } = data

  const dispatcher: EventDispatcher = useMemo<EventDispatcher>(
    eventsFactory(data),
    [data.bind.props]
  )

  if (shared && !shared.dispatchers[order])
    shared.dispatchers[order] = dispatcher

  return dispatcher
}
