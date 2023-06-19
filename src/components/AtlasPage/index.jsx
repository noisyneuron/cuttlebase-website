import './index.scss'
import { useState  } from 'react'
import { useBreakpointContext } from '../../util/BreakpointProvider'
import { RegionMenu } from '../RegionMenu'
import { Toggle } from '../Toggle'
import { ThreeDSection } from '../ThreeDSection'
import { HistologySection } from '../HistologySection'


export function AtlasPage({ isBrain }) {
  const [view, setView] = useState('brain')
  const { isMobile, isTablet } = useBreakpointContext()


  return (
    (isMobile || isTablet)
      ?
      <div className='small-screen-msg'>
        <h3>
          Sorry, the atlas is only available on screens larger than 1024px.
        </h3>
      </div>
      :
      <>
        <div className='bar left'>
          {
            isBrain &&
            <Toggle
              offLabel='3D Brain'
              onLabel='Histology'
              size='large'
              initial={view === 'histology'}
              onChange={(state) => setView(state ? 'histology' : 'brain')}
            />
          }
          <RegionMenu title={isBrain ? 'Brain regions' : '3D Cuttlefish'} />
        </div>
        {
          isBrain 
          ?
            view === 'brain'
              ? <ThreeDSection isBrain={isBrain}/>
              : <HistologySection />
          :
            <ThreeDSection isBrain={isBrain}/>
        }
      </>

  )
}