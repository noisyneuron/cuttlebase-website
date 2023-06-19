import './index.scss'
import { useBreakpointContext } from '../../util/BreakpointProvider'

export function PageHeader({ title, subtitle, children, ...props }) {
  return (
    <div className='page__header inset'>
      <h2 className='-bold'> {title} </h2>
      <h2> {subtitle} </h2>
      {children}
    </div>
  )
}

export function SectionHeader({ title, big = true, inset = true, children }) {
  const { isMobile, isTablet } = useBreakpointContext()

  return (
    <div className={`section__header ${big ? '' : 'narrow'}`}>
      <div className={inset ? 'inset' : ''}>
        {
          big
            ? isMobile || isTablet
              ? <h3> {title} </h3>
              : <h2> {title} </h2>
            : <h5 className='-bold'> {title} </h5>
        }
        {children}
      </div>
    </div>
  )
}