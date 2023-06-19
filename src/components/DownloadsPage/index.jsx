import './index.scss'
import { PageHeader } from '../Headlines'

export function DownloadsPage({ content }) {
  return (
    <div className='downloadspage'>
      <PageHeader title={content.title} subtitle={content.subtitle} />

      {
        content.sections.map((section, i) => {
          return (
            <section key={`download-section-${i}`}>
              <div className="inset flex">
                <div className='column title'>
                  <h4> {section.title} </h4>
                </div>
                <div className='column content flex'>
                  {
                    section.items.map((item, j) => {
                      return (
                        <div className='item flex' key={`download-section-${i}-${j}`}>
                          <p className='description'> {item.description} </p>
                          <p className='type'> {item.type} </p>
                          <a href={item.link} target='_blank' rel='noreferrer'>
                            <img src='assets/icons/link.svg' alt='link' />
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </section>
          )
        })
      }

    </div>
  )
}