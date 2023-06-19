import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { useMenuState } from '../../util/MenuProvider'
import { Toggle } from '../Toggle'
import { Icon } from '../Icon'
import { Slider } from '../Slider'
import { ThreeDScene } from '../ThreeDScene'
import { ThreeDMiniScene } from '../ThreeDMiniScene'
import { colors as colorsBrain, breadcrumbs as breadcrumbsBrain, regions as regionsBrain } from '../../data/brain.json'
import { colors as colorsBody, breadcrumbs as breadcrumbsBody, regions as regionsBody } from '../../data/body.json'

const miniBrainScale = 10
const miniBodyScale = 1

export function ThreeDSection({ isBrain }) {
  const menuState = useMenuState()
  const [glassOpacity, setGlassOpacity] = useState(isBrain ? 0 : 20)
  const [cartilage, setCartilage] = useState(false)
  const [body, setBody] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [center, setCenter] = useState(0)
  const [capture, setCapture] = useState(0)
  const prevCenter = useRef(center)
  const miniCameraRef = useRef()
  const regionRef = useRef('')
  const functionRef = useRef('')
  const tooltipRef = useRef()

  useEffect(() => {
    if (prevCenter.current !== center && body) {
      setBody(false)
      prevCenter.current = center
    }
  }, [center, body])

  const onMouseMove = useCallback( (event) => {
    tooltipRef.current.style.top = `${event.clientY + 10}px`
    tooltipRef.current.style.left = `${event.clientX + 10}px`
  }, [])

  return (
    <>
      <div className='main brain-section'>
        <div className='content'>
          <div className='info'>
            <div className='region__info'>
              <p className='-small'>
                <span className='-small' ref={regionRef}></span> <br />
                <span className='-small' ref={functionRef}></span>
              </p>
            </div>
          </div>

          <div className='canvas' onMouseMove={onMouseMove}>
            <Canvas>
              <Suspense fallback={null}>
                <ThreeDScene
                  glassOpacity={glassOpacity / 100}
                  body={body}
                  cartilage={cartilage}
                  autoRotate={autoRotate}
                  center={center}
                  capture={capture}
                  miniScale={isBrain ? miniBrainScale : miniBodyScale}
                  miniCameraRef={miniCameraRef}
                  regionRef={regionRef}
                  functionRef={functionRef}
                  currentSelection={menuState.currentSelection}
                  isBrain={isBrain}
                  colors={isBrain ? colorsBrain : colorsBody}
                  breadcrumbs={isBrain ? breadcrumbsBrain : breadcrumbsBody}
                  regions={isBrain ? regionsBrain : regionsBody}
                  key={isBrain ? 'brain-scene' : 'body-scene'}
                  ref={tooltipRef}
                />
              </Suspense>
            </Canvas>
            <p className='tooltip -small -hide' ref={tooltipRef}></p>
          </div>

        </div>
      </div>


      <div className='bar right'>
        <div className='mini__canvas'>
          <Canvas>
            <Suspense fallback={null}>
              <ThreeDMiniScene
                isBrain={isBrain}
                initialZ={isBrain ? miniBrainScale : miniBodyScale}
                ref={miniCameraRef}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className='controls'>
          <div className='control__element'>
            <Icon name='center' label='Center' onClick={() => setCenter(center => center + 1)} />
          </div>

          <div className='control__element'>
            <Icon name='rotate' label='Rotate' active={autoRotate} onClick={() => setAutoRotate(g => !g)} />
          </div>

          <div className='control__element'>
            <Icon name='screenshot' label='Screenshot' onClick={() => setCapture(capture => capture + 1)} />
          </div>

          {
            isBrain &&
            <div className='control__element'>
              <Icon name='cartilage' label='Cartilage' active={cartilage} onClick={() => setCartilage(g => !g)} />
            </div>
          }

          <div className='control__element'>
            <Slider
              name={`Glass ${isBrain ? 'brain' : 'body'}`}
              onChange={(e) => setGlassOpacity(e.target.value)}
              value={glassOpacity}
              min={0}
              max={50}
              step={1}
            />
          </div>

          {
            isBrain &&
            <div className='control__element'>
              <Toggle
                label='Body'
                offLabel='off'
                onLabel='on'
                size='small'
                initial={body}
                onChange={() => setBody(g => !g)}
              />
            </div>
          }

          <div className='control__element -last'>
            <a href={`assets/models/cuttlefish_${isBrain ? 'brain' : 'body'}.glb`}>
              <Icon name='download' label='Download' />
            </a>
          </div>

        </div>
      </div>
    </>
  )
}