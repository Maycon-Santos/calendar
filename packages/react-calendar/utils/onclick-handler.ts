import React from 'react'

export default function onClickHandler (original?: (...args: any) => any, substitute?: (...args: any) => any) {
  return (event:  React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (substitute) {
      substitute({
        event,
        originalHandler: () => original && original(event),
      })
    } else if (original) {
      original(event)
    }
  }
}
