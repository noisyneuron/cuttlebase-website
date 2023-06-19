import './base.scss'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
// import { DebugGrid } from '../components/DebugGrid'
import { useBreakpointContext } from '../util/BreakpointProvider'
import content from '../data/content.json'

const gtag = window.gtag
export function Layout({ theme, pageClass, fixed, children, ...props }) {
  const { mqClass } = useBreakpointContext()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof (gtag) === 'function') {
      gtag('config', 'G-YXM85Z22L9', {
        'page_title': document.title,
        'page_location': window.location.href,
        'page_path': pathname
      })
    }
  }, [pathname])

  return (
    <div className={`theme-${theme} ${mqClass}`}>
      <div className={`page ${pageClass}`}>
        <Header />
        {
          fixed ?
            <div className='fixed'>
              {children}
            </div>
            :
            <>
              {children}
              <Footer twitter={content.global.twitter} address={content.global.address} />
            </>
        }
        {/* <DebugGrid /> */}
      </div>
    </div>
  )
}