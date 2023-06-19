import './index.scss'
import { useState } from 'react'

export function DebugGrid() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className={`debug__grid-wrapper ${visible ? '' : '-hidden'}`}>
        <div className='debug__grid-container'>
          <div className='debug__grid'></div>
        </div>
      </div>

      <button className='debug__grid-btn' onClick={() => setVisible(v => !v)}> GRID </button>
    </>
  )
}