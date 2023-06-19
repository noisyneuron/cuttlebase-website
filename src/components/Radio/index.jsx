import './index.scss'
import React, { useState, memo } from 'react'

export const Radio = memo(({ onChange, initial, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(initial)

  return (
    <div className='radio__group'>
      {
        props.children.map((child, index) => {
          return React.cloneElement(child, {
            active: index === activeIndex,
            onClick: () => {
              setActiveIndex(index)
              if(onChange) onChange(index)
            }
          })
        })
      }
    </div>
  )
})
