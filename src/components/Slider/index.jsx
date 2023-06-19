import './index.scss'
import { memo } from 'react'

export const Slider = memo(({ name, min = 0, max = 100, value = 10, step = 1, unit = '%', onChange, ...props }) => {

  return (
    <div className="slider">
      <p className="slider__value -small"> {value}{unit}</p>
      <input
        className="slider__input"
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
      />
      <p className="slider__name -small"> {name} </p>
    </div>
  )
})

