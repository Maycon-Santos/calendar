import React from 'react'

export default function customOnClick (
  original?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  substitute?: (...args: any) => void
) {
  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (original && substitute) {
      return substitute({
        event,
        originalHandler: () => original && original(event)
      })
    }
    
    if (substitute) {
      return substitute({ event })
    }
    
    if (original) {
      return original(event)
    }

    return false
  }
}
