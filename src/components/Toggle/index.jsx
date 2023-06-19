import './index.scss'
import { useState, useEffect, memo } from 'react'

export const Toggle = memo(({ label, offLabel, onLabel, initial = false, size, onChange, ...props }) => {
  const [state, setState] = useState(initial)

  useEffect(() => {
    setState(initial)
  }, [initial])

  return (
    <div className='toggle__wrapper'>
      <div
        className={`toggle -${size}`}
        onClick={() => {
          const newState = !state
          setState(newState)
          onChange && onChange(newState)
        }}
      >
        <div className='toggle__element toggle__base -rounded'></div>
        <div className={`toggle__element toggle__knob -rounded -${state ? 'on' : 'off'}`}></div>
        <div className='toggle__element toggle__labels'>
          <span className={`${!state ? '-active' : ''}`}> {offLabel} </span>
          <span className={`${state ? '-active' : ''}`}> {onLabel} </span>
        </div>
      </div>
      {
        label
          ? <p className='-small'> {label} </p>
          : null
      }
    </div>

  )
})