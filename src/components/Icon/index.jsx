import './index.scss'
import { memo } from 'react'

export const Icon = memo(({ name, label, size, active, onClick, row, ...props }) => {
  return (
    <div className={`icon__wrapper ${row ? '-row' : ''}`}>
      <div
        className={`icon -${name} ${size ? '-' + size : ''} ${active ? '-active' : ''}`}
        onClick={onClick}
      >
        <img src={`assets/icons/${name}.svg`} alt={`${name} icon`} />
      </div>
      {
        label
          ? <p className='-small'> {label} </p>
          : null
      }
    </div>

  )
})