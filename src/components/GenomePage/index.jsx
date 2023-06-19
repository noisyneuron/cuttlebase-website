import './index.scss'
import { PageHeader, SectionHeader } from '../Headlines'
import parse from 'html-react-parser'

export function GenomePage({ content }) {
  return (
    <div className='genomepage'>
      <PageHeader title={parse(content.header.title)} subtitle={content.header.subtitle} />

      
        <div className='inset flex'>

          <div className='halfColumn'>
            <section>
              {
                content.summary.text.map((t, i) => {
                  return (
                    <p key={`summary-${i}`}> {parse(t.value)} </p>
                  )
                })
              }
            </section>

            <section className='last'>
              <p className='-bold'>{parse(content.team.title)}<br/><br/></p>
              {
                content.team.items.map((item, i) => {
                  return (
                    <p key={`genome-team-${i}`}><span className='-bold'>{item.title}: </span><span>{item.text}</span></p>
                  )
                })
              }
            </section>
          </div>

          <div className='halfColumn'>
            <section>
              <div className='section__content'>
                {
                  content.details.items.map((t, i) => {
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

            
            <section>
              <p className='-bold'>{content.downloads.title}<br/><br/></p>
              {
                content.downloads.items.map( (item, i) => {
                  return <p key={`genome-dl-${i}`}><a href={`${item.url}`} target="_blank" rel="noreferrer">{item.title}</a></p>
                })
              }
            </section>

            <section className='last'>
              <p className='-bold'>{content.publications.title}<br /><br /></p>
              {
                content.publications.items.map((item, i) => {
                  return <p key={`genome-dl-${i}`}><a href={`${item.url}`} target="_blank" rel="noreferrer">{item.title}</a></p>
                })
              }
            </section>

          </div>
        </div>
      

    </div>
  )
}