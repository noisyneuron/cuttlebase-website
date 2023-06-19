import './index.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpointContext } from '../../util/BreakpointProvider'
import { config } from '../../data/config'

function SmallHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.touchAction = ''
    }
  }, [open])

  return (
    <div className={`main ${open ? 'open' : ''}`}>
      <div className='container'>
        <Link to='/'>
          <img className='logo -invert__dark' src='assets/logo-black.svg' alt='logo' />
        </Link>

        <div className='menu__toggle' onClick={() => setOpen(x => !x)}>
          <img className='-invert__light' src={`assets/icons/menu${open ? '-close' : ''}.svg`} alt='toggle menu' />
        </div>
      </div>

      <div className='container overlay'>
        <section>
          <p className='-bold'> Tools </p>
          <ul>
            {
              config.routes.filter(r => r.inTools).map(route => {
                return (
                  <li key={`header-link-${route.link}`}>
                    <Link className='tool' to={route.path} onClick={() => setOpen(false)}>
                      {route.link}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <section>
          <p className='-bold'> Explore </p>
          <ul>
            {
              config.routes.filter(r => r.inHeader).map(route => {
                return (
                  <li key={`header-link-${route.link}`}>
                    <Link className='tool' to={route.path} onClick={() => setOpen(false)}>
                      {route.link}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </div>

    </div>
  )
}



function LargeHeader() {
  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <>
      <div className='main'>
        <div className='container'>
          <div className='content'>
            <a href='/'>
              <p className='tag -serif -small'>
                A scientific toolkit for the <br />dwarf cuttlefish, <i>Sepia bandensis</i>.
              </p>
            </a>
          </div>

          <div className='content'>
            <ul>
              <li className='tools__toggle'>
                
                <img className={`-invert__dark ${toolsOpen ? '-visible' : ''}`} onClick={() => setToolsOpen(false)} src='assets/icons/close.svg' alt='close tool menu' />
                <span onClick={() => setToolsOpen(x => !x)}> Tools </span>
              </li>

              {
                config.routes.filter(r => r.inHeader).map(route => {
                  return (
                    <li key={`header-link-${route.link}`}>
                      <Link to={route.path}> {route.link} </Link>
                    </li>
                  )
                })
              }

              <li>
                <Link to='/'>
                  <img className='logo -invert__dark' src='assets/logo-black.svg' alt='logo' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`dropdown ${toolsOpen ? 'open' : ''}`}>
        <div className='container'>
          {
            config.routes.filter(r => r.inTools).map(route => {
              return (
                <Link className='tool' to={route.path} key={`header-link-${route.link}`}>
                  <img className='-invert__dark' src={route.icon} alt={`icon for ${route.link}`} />
                  {route.link}
                </Link>
              )
            })
          }
        </div>
      </div>
    </>
  )
}



export function Header() {
  const { isMobile, isTablet } = useBreakpointContext()

  return (
    <div className='header'>
      <div className='buffer'></div>
      {
        isMobile || isTablet ? <SmallHeader /> : <LargeHeader />
      }
    </div>
  )
}