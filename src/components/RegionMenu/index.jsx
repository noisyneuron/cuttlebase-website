import './index.scss'
import { useMenuDispatch, useMenuState } from "../../util/MenuProvider"
import { Checkbox } from '../Checkbox'

function RegionSelection({ name, checked, open, children = [], indices = [], ...props }) {
  const dispatch = useMenuDispatch()

  return (
    <div className={`region__selection ${!open ? '-closed' : ''}`}>

      <div className="region__element">
        {
          children.length > 0
            ?
            <span className='triangle' onClick={() => dispatch({ type: 'accordian', indices: indices, value: !open })}>
              {open
                ?
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7L1.5359 1L8.4641 1L5 7Z" stroke="white" />
                </svg>
                :
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 5L1 8.4641V1.5359L7 5Z" stroke="white" />
                </svg>
              }
            </span>
            :
            <span></span>
        }
        <Checkbox
          state={checked}
          name={name}
          onChange={() => dispatch({ type: 'check', indices: indices, value: checked === 1 ? -1 : 1, abbreviation: props.abbreviation })}
        />
      </div>

      {
        children.map((child, index) => {
          return (
            <RegionSelection
              {...child}
              indices={[...indices, index]}
              key={[...indices, index].toString()}
            />
          )
        })
      }
    </div>
  )
}

export function RegionMenu({ title }) {
  const state = useMenuState()

  return (
    <div className="region__menu">
      <h4> {title} </h4>
      <div className="scrollable">
        <div className='scrollable__content -vertical'>
          {
            state.menu.map((region, index) => {
              return (
                <RegionSelection
                  {...region}
                  indices={[index]}
                  key={index}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}