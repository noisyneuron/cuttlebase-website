import './index.scss'
import parse from 'html-react-parser'
import { config } from '../../data/config'
import { Link } from 'react-router-dom'
import { useBreakpointContext } from '../../util/BreakpointProvider'

function Copyright() {
  return (
    <p className='copyright'>
      &copy; {new Date().getFullYear()} Cuttlebase. All rights reserved.
    </p>
  )
}

function Twitter({ link }) {
  return (
    <a href={link} className='twitter' target='_blank' rel='noreferrer'>
      <img src='assets/icons/twitter.svg' alt='twitter'/>
      <p> Follow us </p>
    </a>
  )
}

export function Footer({ twitter, address }) {
  const { isMobile, isTablet } = useBreakpointContext()

  return (
    <div className='footer'>
      <div className='container'>

        <div className='column'>
          <div className='top'>
            <a href='/' className='logo'>
              <img src='assets/logo-white.svg' alt='logo'></img>
            </a>
          </div>
          <div className='bottom'>
            <p className='narrow -small -serif'>
              This project was supported by a Zuckerman Institute Seed Grant
            </p>
            <a className='logo' href='https://zuckermaninstitute.columbia.edu/' target='_blank' rel='noreferrer'>
              <img src='assets/footer/columbia.png' alt='columbia logo' />
            </a>
            <a className='logo' href='https://www.hhmi.org/' target='_blank' rel='noreferrer'>
              <img src='assets/footer/hhmi.png' alt='hhmi logo' />
            </a>
          </div>
        </div>

        <div className='column'>
          <div className='top'>
            <p>
              {parse(address)}
            </p>
          </div>
          <div className='bottom'>
            {isMobile || isTablet ? <Twitter link={twitter} /> : <Copyright />}
          </div>
        </div>

        <div className='column'>
          <div className='top'>
            {
              config.routes.filter(r => r.inTools).map(route => {
                return (
                  <Link className='link' to={route.path} key={`footer-link-${route.link}`}>
                    {route.link}
                  </Link>
                )
              })
            }
            {
              config.routes.filter(r => r.inHeader).map(route => {
                return (
                  <Link className='link' to={route.path} key={`footer-link-${route.link}`}>
                    {route.link}
                  </Link>
                )
              })
            }
          </div>
          <div className='bottom'>
            {isMobile || isTablet ? <Copyright /> : <Twitter link={twitter} />}
          </div>
        </div>

      </div>
    </div>
  )
}