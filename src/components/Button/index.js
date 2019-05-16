import React from 'react'

const Button = props => {
  const { text, clickHandler, visible = true } = props

  if (!visible) {
    return null
  }

  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

export default Button
