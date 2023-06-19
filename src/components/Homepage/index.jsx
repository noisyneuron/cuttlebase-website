import './index.scss'
import parse from 'html-react-parser'
import { useBreakpointContext } from '../../util/BreakpointProvider'
import { Link } from 'react-router-dom'
import { Video } from '../Video'
import { SectionHeader } from '../Headlines'
import { config } from '../../data/config'



export function Homepage({ content }) {
  const { isMobile, isTablet } = useBreakpointContext()

  return (
    <div className='homepage'>
      <section>
        <div className='container'>
          <div className='video-top'>
            <Video src={`https://player.vimeo.com/video/${content.intro.video}?background=1`} />
            <div className='banner'>
              <img src='assets/homepage/logo-banner_1.svg' alt='banner' />
            </div>
          </div>
        </div>
      </section>

      <section className='intro'>
        <div className='inset'>
          {
            isMobile || isTablet
              ?
              <>
                <h2> {parse(content.intro.title)} </h2>
                <p> {parse(content.intro.subtitle)} </p>
                <div className='images'>
                  <img src='assets/homepage/illustration2.png' alt='cuttlefish illustration' />
                  <img src='assets/homepage/illustration1.png' alt='cuttlefish illustration' />
                </div>
              </>
              :
              <>
                <div className='row1 flex'>
                  <h1> {parse(content.intro.title)} </h1>
                  <img src='assets/homepage/illustration1.png' alt='cuttlefish illustration' />
                </div>
                <div className='row2 flex'>
                  <h5> {parse(content.intro.subtitle)} </h5>
                  <img src='assets/homepage/illustration2.png' alt='cuttlefish illustration' />
                </div>
              </>
          }
        </div>
      </section>

      <section className='tools'>
        <SectionHeader title='Tools' />
        <div className='inset flex'>
          {
            config.routes.filter(r => r.inTools).map(route => {
              return (
                <div className='tool halfColumn' key={`homepage-tool-${route.link}`}>
                  <h3> {route.link} </h3>
                  <Link className='tool' to={route.path}>
                    <div className='icon__wrapper'>
                      <img className='-invert__dark' src={route.icon} alt={`icon for ${route.link}`} />
                    </div>
                    <p>
                      {parse(content.tools[route.key])}
                    </p>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </section>

      <section className='video'>
        <SectionHeader title={content.dwarf.heading} />
        <div className='inset'>
          <Video src={`https://player.vimeo.com/video/${content.dwarf.video}?background=1`} />
        </div>
      </section>

      <section className='content'>
        <div className='inset flex section__content'>
          <div className='halfColumn'>
            {
              content.dwarf.textBig.map((t, i) => {
                return (
                  <h3 key={`dwarf-big-${i}`}> {parse(t.value)} </h3>
                )
              })
            }
          </div>
          <div className='halfColumn'>
            {
              content.dwarf.textSmall.map((t, i) => {
                return (
                  <h5 key={`dwarf-small${i}`}> {parse(t.value)} </h5>
                )
              })
            }
          </div>
        </div>
      </section>

      <section className='content'>
        <SectionHeader title={content.brain.heading} />
        <div className='inset narrow section__content'>
          {
            content.brain.textBig.map((t, i) => {
              return (
                <h2 key={`brain-big-${i}`}> {parse(t.value)} </h2>
              )
            })
          }
          {
            content.brain.textSmall.map((t, i) => {
              return (
                <h3 key={`brain-small-${i}`}> {parse(t.value)} </h3>
              )
            })
          }
        </div>
      </section>

      <section className='image'>
        <div className='inset'>
          <img src={`assets/homepage/brain${isMobile || isTablet ? '-mobile' : ''}.png`} alt='brain size comparisons' />

        </div>
      </section>

      <section className='content'>
        <SectionHeader title={content.evolution.heading} />
        <div className='inset flex section__content'>
          <div className='halfColumn'>
            {
              content.evolution.textBig.map((t, i) => {
                return (
                  <h3 key={`evolution-big-${i}`}> {parse(t.value)} </h3>
                )
              })
            }
          </div>
          <div className='halfColumn'>
            {
              content.evolution.textSmall.map((t, i) => {
                return (
                  <h5 key={`evolution-small-${i}`}> {parse(t.value)} </h5>
                )
              })
            }
          </div>
        </div>
      </section>

      <section className='image tree'>
        <div className='inset'>
          <img src={`assets/homepage/tree${isMobile || isTablet ? '-mobile' : ''}.png`} alt='tree' />
        </div>
      </section>

      <section className='content halved'>
        <SectionHeader title={content.lifecycle.heading} />
        <div className='bg'>
          <div className='inset'>
            <Video src={`https://player.vimeo.com/video/${content.lifecycle.video}?background=1`} />
          </div>
        </div>
      </section>

      <section className='content inverted'>
        <div className='inset section__content'>
          {
            content.lifecycle.textBig.map((t, i) => {
              return (
                <h3 key={`lifecycle-big-${i}`}> {parse(t.value)} </h3>
              )
            })
          }
          <div className='flex'>
            <div className='halfColumn'>
              {
                content.lifecycle.textLeft.map((t, i) => {
                  return (
                    <p key={`lifecycle-left-${i}`}>
                      <b>{t.title}:</b> {parse(t.text)}
                    </p>
                  )
                })
              }
            </div>
            <div className='halfColumn'>
              {
                content.lifecycle.textRight.map((t, i) => {
                  return (
                    <p key={`lifecycle-right-${i}`}>
                      <b>{t.title}:</b> {parse(t.text)}
                    </p>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}