import './index.scss'
import { useState, useRef, useCallback, useLayoutEffect } from 'react'
import parse from 'html-react-parser'
import { useBreakpointContext } from '../../util/BreakpointProvider'
import { PageHeader, SectionHeader } from '../Headlines'
import { Video } from '../Video'

const origMmPerPx = 0.0038
const originalCardWidth = 1240
const scaleBar = 50

function TextStage({ content, icon, ...props }) {
  return (
    <div className='text-column'>
      <h3>{parse(content.heading)}</h3>
      <p className='-serif'> {parse(content.text)} </p>
      {
        icon &&
        <img className='icon' src='assets/icons/orientation.svg' alt='orientation change'/>
      }
    </div>
  )
}

function ImageStage({ content, mobile, ...props }) {
  return (
    <div className='image-column'>
      <p className='heading -bold'> {mobile && content.headingMobile ? content.headingMobile : content.heading} &nbsp;</p>
      <div className='info flex'>
        <p className='-bold'> {mobile && content.textLeftMobile ? content.textLeftMobile : content.textLeft} </p>
        <p> {mobile && content.textRightMobile ? content.textRightMobile : content.textRight} </p>
      </div>
      <img src={`assets/developmentpage/embryo_images/${content.image}.jpg`} alt='embryo' />
    </div>
  )
}

export function DevelopmentPage({ content, citation }) {
  const mq = useBreakpointContext()
  const [scale, setScale] = useState(1)
  const cardRef = useRef(null)
  const observer = useRef()

  const disconnect = useCallback(() => observer.current?.disconnect(), []);
  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => {
      const s = scaleBar * origMmPerPx * originalCardWidth / cardRef.current.clientWidth
      setScale(s.toFixed(2))
    });
    if (cardRef.current) observer.current.observe(cardRef.current);
  }, [cardRef]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return (
    <div className='developmentpage'>
      <PageHeader title={content.title} subtitle={content.subtitle} />

      <div className='container'>
        <div className='flex sections'>
          {
            content.sections.map((section, i) => {
              return (
                <div className='column' key={`development-section-${i}`}>
                  <div className='content'>
                    <div className='heading'>
                      <span className='-serif'> {i + 1} </span>
                      <h3> {section.title} </h3>
                    </div>
                    <p className='-serif'> {section.text} </p>
                  </div>
                  <div className='media'>
                    {
                      section.video
                        ? <Video src={`https://player.vimeo.com/video/${section.video}?background=1`} />
                        : <img src={`assets/developmentpage/${section.image}.jpg`} alt='embryo' />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='glossary'>
        <div className='inset flex'>
          <p className='-serif -bold'>
            {content.stages.title}
          </p>
          <div className='info flex'>
            <div className='scale flex'>
              <p> Scale </p>
              <div className='scale-bar'></div>
              <p>{scale}mm </p>
            </div>
            <div className='legand'>
              <p>
                <span className='-bold'> hpf </span>
                hours
                <span className='-bold'> dpf </span>
                days
                <span className='-bold'> wpf </span>
                weeks  /  post-fertilization
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='inset series'>
        {
          mq.isMobile || mq.isTablet
            ? null
            : <img src='assets/developmentpage/series.png' alt='staging series' />
        }
      </div>

      <div className='stages inset'>
        {
          content.stages.items.map((stage, i) => {
            return (
              <div className='column' ref={el => i === 0 ? (cardRef.current = el) : null} key={`development-stage-${i}`} >
                {
                  stage.type === 'text'
                    ? <TextStage content={stage} icon={i===0}/>
                    : <ImageStage content={stage} mobile={mq.isMobile || mq.isTablet} />
                }
              </div>
            )
          })
        }
      </div>

      <section className='citation'>
        <SectionHeader title={'Citation'} big={false} />
        <div className='inset section__content'>
          <p className='-bold'>If you use our tools, please cite our work <br /><br /></p>
          <p> {parse(citation)} </p>
        </div>
      </section>
    </div>
  )
}