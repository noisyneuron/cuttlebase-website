import './index.scss'

export function Checkbox({ name, state, onChange, ...props }) {
  return (
    <div
      className={`checkbox__wrapper ${state === 0 ? '-indeterminate' : (state === 1 ? '-checked' : '-unchecked')}`}
      onClick={onChange}
    >
      <span className='label -small'> {name} </span>
      <div className='checkbox'>
        <div className="checkbox__circle"></div>
      </div>
    </div>
  )
}