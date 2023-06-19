import './index.scss'
import { PageHeader } from '../Headlines'
import { config } from '../../data/config'


export function TeamPage({ content }) {
  return (
    <div className='teampage'>
      <PageHeader title={content.title}>
        <p> {content.subtitle} </p>
        <div className='guide'>
          {
            config.routes.filter(r => r.inTools).map(route => {
              return (
                <div className='item' key={`team-tool-${route.link}`}>
                  <img className='-invert__dark' src={route.icon} alt={`icon for ${route.link}`} />
                  <span>
                    {route.link}
                  </span>
                </div>
              )
            })
          }
        </div>
      </PageHeader>

      <div className='inset'>
        <div className='person top flex'>
          <div className='column'>
            <p> Name </p>
          </div>
          <div className='column'>
            <p> Contribution </p>
          </div>
          <div className='column'>
            <p> Contact </p>
          </div>
        </div>
        {
          content.people.map((person, index) => {
            return (
              <div className='person flex' key={`team-${index}`}>
                <div className='column'>
                  <p className='-bold'> {person.name} </p>
                </div>

                <div className='column'>
                  {
                    person.contribution
                      ?
                      <>
                        <img src='assets/icons/brain.svg' alt='brain icon' className={person.contribution && person.contribution.includes('B') ? 'visible' : ''} />
                        <img src='assets/icons/body.svg' alt='body icon' className={person.contribution && person.contribution.includes('C') ? 'visible' : ''} />
                        <img src='assets/icons/development.svg' alt='development icon' className={person.contribution && person.contribution.includes('E') ? 'visible' : ''} />
                        <img src='assets/icons/genome.svg' alt='genome icon' className={person.contribution && person.contribution.includes('G') ? 'visible' : ''} />
                      </>
                      : <p> {person.position} </p>
                  }
                </div>

                <div className='column'>
                  <p> {person.email} </p>
                  <p> <a href={`http://${person.website}`} target='_blank' rel='noreferrer'> {person.website} </a></p>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}