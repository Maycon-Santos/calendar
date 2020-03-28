import React from 'react'

export default function customOnClick (original?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void, substitute?: (...args: any) => void) {
  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (original && substitute) {
      substitute({
        event,
        originalHandler: () => original && original(event),
      })
    } else if (substitute) {
      substitute({ originalEvent: event })
    } else if (original) {
      original(event)
    }
  }
}
