import './index.scss'
import parse from 'html-react-parser'
import { useBreakpointContext } from '../../util/BreakpointProvider'
import { PageHeader, SectionHeader } from '../Headlines'

export function InfoPage({ content, citation }) {
  const { isMobile, isTablet } = useBreakpointContext()
  return (
    <div className='infopage'>
      <PageHeader title={content.header.title} subtitle={content.header.subtitle} />

      <section>
        <div className='inset flex'>

          <div className='halfColumn anatomy'>
            <SectionHeader title={content.anatomy.title} big={false} inset={false}>
              <p> {content.anatomy.subtitle} </p>
            </SectionHeader>
            <img src='assets/infopage/anatomy-side.png' alt='anatomy' />
            <img src='assets/infopage/anatomy-top.png' alt='anatomy' />
          </div>

          <div className='halfColumn'>
            <SectionHeader title={content.planes.title} big={false} inset={false}>
              <p> {content.planes.subtitle} </p>
            </SectionHeader>

            <section className='planes flex'>
              <div className='plane'>
                <p className='-bold'> Transverse </p>
                <img src='assets/infopage/transverse.png' alt='transverse' />
              </div>
              <div className='plane'>
                <p className='-bold'> Sagittal </p>
                <img src='assets/infopage/sagittal.png' alt='sagittal' />
              </div>
              <div className='plane'>
                <p className='-bold'> Horizontal </p>
                <img src='assets/infopage/horizontal.png' alt='horizontal' />
              </div>
            </section>

            <section>
              <SectionHeader title={content.key.title} big={false} inset={false} />
              <div className='section__content'>
                {
                  content.key.items.map((t, i) => {
                    return (
                      <p key={`info-key-${i}`}>
                        <b>{t.title}:</b> {parse(t.text)}
                      </p>
                    )
                  })
                }
              </div>
            </section>

            <section className='last'>
              <SectionHeader title={content.subjects.title} big={false} inset={false} />
              <div className='section__content'>
                {
                  content.subjects.items.map((t, i) => {
                    return (
                      <div className='subject__line' key={`info-subjects-${i}`}>
                        <span><b>{t.title}:</b></span>
                        <span>{parse(t.text)}</span>
                      </div>
                    )
                  })
                }
              </div>
            </section>
          </div>
        </div>
      </section>

      <div className={isMobile || isTablet ? 'inset' : ''}>
        <section>
          <SectionHeader title={content.summary.title} big={false}>
            <p> {parse(content.summary.subtitle)} </p>
          </SectionHeader>

          <div className='inset flex summary'>
            {
              [content.summary.brain, content.summary.histology, content.summary.body].map((item, index) => {
                return (
                  <div className='column' key={`summary-${item.title}`}>
                    <p className='title -bold'>
                      {item.title}
                      <img src={`assets/icons/${index === 2 ? 'body' : 'brain'}.svg`} alt='icon'></img>
                    </p>
                    {
                      item.text.map((t, i) => {
                        return (
                          <p key={`summary-${item.title}-${i}`}> {parse(t.value)} </p>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </section>

        <section className='last'>
          <SectionHeader title={content.publication.title} big={false} />
          <div className='inset section__content'>
            <div className='halfColumn'>
              <p className='-bold'>If you use our tools, please cite our work <br /><br /></p>
              <p> {parse(citation)} </p>
              {
                content.publication.items.map((item, i) => {
                  return <p key={`pub-${i}`}><br/>{parse(item.text)}</p>
                })
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}