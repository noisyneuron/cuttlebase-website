import './index.scss'
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { useMenuState } from '../../util/MenuProvider'
import { orientations, stains, layersWithPart, resizeFactor } from '../../data/brain.json'
import { HistologyLayer } from '../HistologyLayer'
import { HistologyThumbnail } from '../HistologyThumbnail'
import { Toggle } from '../Toggle'
import { Icon } from '../Icon'
import { Slider } from '../Slider'
import { Radio } from '../Radio'

const scaleBarWidth = 100
const micronPerPx = 4

export function HistologySection() {
  const { currentSelection } = useMenuState()
  const [orientation, setOrientation] = useState(0)
  const [stain, setStain] = useState(0)
  const [cartilage, setCartilage] = useState(false)
  const [layerIndex, setLayerIndex] = useState(Math.round(orientations[orientation].layerCount / 2))
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
  const [outline, setOutline] = useState(true)
  const [opacity, setOpacity] = useState(40)
  const [zoom, setZoom] = useState(100)
  const [scale, setScale] = useState(1)
  const info = useRef({ breadcrumbRef: null, regionRef: null, functionRef: null })
  const zoomCanvas = useRef()
  const zoomer = useRef()
  const transform = useRef({ x: 0, y: 0 })
  const observer = useRef()
  const tooltipRef = useRef()

  const disconnect = useCallback(() => observer.current?.disconnect(), []);
  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setCanvasDimensions({ width, height })
    })
    if (zoomCanvas.current) observer.current.observe(zoomCanvas.current)
  }, [zoomCanvas]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);


  const onLayerChange = useCallback((direction) => {
    const layerCount = orientations[orientation].layerCount
    setLayerIndex(layer => {
      return ((layer + direction) % layerCount + layerCount) % layerCount
    })
  }, [orientation])

  const onOrientationChange = useCallback((index) => {
    const count = orientations[index].layerCount
    setOrientation(index)
    setLayerIndex(Math.round(count / 2))
  }, [])

  useEffect(function addKeyPressHandlers() {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onLayerChange(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onLayerChange(-1)
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return (() => {
      document.removeEventListener('keydown', handleKeyPress)
    })
  }, [onLayerChange])

  useEffect(function setLayerOnOrientationChange() {
    const layerCounts = {}
    let maxCount = -1
    let maxLayer = -1
    currentSelection.forEach(part => {
      layersWithPart[orientations[orientation].name][part].forEach(layer => {
        if (layerCounts[layer]) {
          layerCounts[layer] = layerCounts[layer] + 1
        } else {
          layerCounts[layer] = 1
        }
        if (layerCounts[layer] > maxCount) {
          maxCount = layerCounts[layer]
          maxLayer = layer
        }
      })
    })
    if (maxLayer !== -1) {
      setLayerIndex(maxLayer)
    }
  }, [orientation])


  const onCenterCanvas = useCallback(() => {
    const { width, height } = canvasDimensions
    transform.current.x = width / 2
    transform.current.y = height / 2
    zoomer.current.style.transformOrigin = `${transform.current.x}px ${transform.current.y}px`
  }, [canvasDimensions])

  useEffect(onCenterCanvas, [canvasDimensions, onCenterCanvas])

  useEffect(function calculateScale() {
    const ratio =
      orientations[orientation].width > orientations[orientation].height
        ? canvasDimensions.width / orientations[orientation].width
        : canvasDimensions.height / orientations[orientation].height
    const totalScale = ratio * resizeFactor * (zoom / 100)
    const micronPerWebPx = micronPerPx / totalScale
    zoomer.current.style.transform = `scale(${zoom / 100})`
    setScale(micronPerWebPx * scaleBarWidth * 0.001)
  }, [zoom, orientation, canvasDimensions])

  useEffect(function initZoomerDims() {
    if (zoomer.current && zoomCanvas.current) {
      const { width, height } = zoomCanvas.current.getBoundingClientRect()
      setCanvasDimensions({ width, height })
    }
  }, [zoomCanvas, observer])



  const onWheel = useCallback((event) => {
    const z = Math.max(100, Math.min(400, Math.floor(zoom - event.deltaY * 0.5)))
    tooltipRef.current.classList.add('-hide')
    setZoom(z)
  }, [zoom])

  const onMoveCanvas = useCallback((event) => {
    if (zoom > 100 && event.buttons === 1) {
      const { width, height } = canvasDimensions
      const x = Math.max(0, Math.min((transform.current.x) - event.movementX, width))
      const y = Math.max(0, Math.min((transform.current.y) - event.movementY, height))
      transform.current.x = x
      transform.current.y = y
      zoomer.current.style.transformOrigin = `${x}px ${y}px`
      tooltipRef.current.innerText = ''
      tooltipRef.current.classList.add('-hide')
    } else {
      if (info.current.regionRef) {
        tooltipRef.current.innerText = info.current.regionRef
        tooltipRef.current.style.top = `${event.clientY + 10}px`
        tooltipRef.current.style.left = `${event.clientX + 10}px`
        tooltipRef.current.classList.remove('-hide')
      } else {
        tooltipRef.current.innerText = ''
        tooltipRef.current.classList.add('-hide')
      }
    }
  }, [canvasDimensions, zoom])

  const onExitCanvas = useCallback((event) => {
    tooltipRef.current.innerText = ''
    tooltipRef.current.classList.add('-hide')
  }, [])

  const onToggleCartilage = useCallback(() => {
    setCartilage(g => !g)
  }, [])

  return (
    <>
      <div className='main histology-section'>
        <div className='content'>
          <div className='info'>
            <div className='region__info'>
              <p className='-small'>
                <span className='-small -bold'>Slice {layerIndex + 1} / {orientations[orientation].layerCount}</span> <br />
                <span className='-small' ref={el => info.current.breadcrumbRef = el}></span> <br />
                <span className='-small' ref={el => info.current.functionRef = el}></span>
              </p>
            </div>
          </div>

          <div className='canvas'>
            <div className='image__canvas' onWheel={onWheel}>
              <div className='histology__nav prev'>
                <img src='assets/icons/left_arrow.svg' onClick={() => onLayerChange(-1)} alt='previous' />
              </div>

              <div
                className={`zoom__wrapper ${zoom > 100 ? '-grabbable' : ''}`}
                ref={zoomCanvas}
                onMouseMove={onMoveCanvas}
                onMouseLeave={onExitCanvas}
                onMouseDown={() => zoom > 100 ? zoomCanvas.current.style.cursor = 'grabbing' : null}
                onMouseUp={() => zoomCanvas.current.style.cursor = ''}
              >
                <div className='zoomer' ref={zoomer}>
                  <div className='orientation__set -active'>
                    <HistologyLayer
                      layerIndex={layerIndex}
                      orientation={orientations[orientation].name}
                      isActive={true}
                      activeStain={stain}
                      showCartilage={cartilage}
                      outline={outline}
                      opacity={opacity}
                      ref={info}
                      key={`histology-${orientations[orientation].name}-${layerIndex}`}
                    />
                  </div>
                </div>
                <p className='tooltip -small -hide' ref={tooltipRef}></p>
              </div>
              <div className='histology__nav next'>
                <img src='assets/icons/right_arrow.svg' onClick={() => onLayerChange(1)} alt='next' />
              </div>
            </div>

            <div className='scalebar'>
              <div className='ruler'>
                <img src='assets/icons/scale.svg' alt='scale' />
              </div>
              <p> {scale.toFixed(2)}mm </p>
            </div>

            <div className='thumbnails'>
              <div className='wrapper'>
                {
                  Array.from({ length: orientations[orientation].layerCount }).map((_, i) => {
                    return (
                      <HistologyThumbnail
                        src={`assets/histology-thumbnails/${orientations[orientation].name}/${String(i).padStart(2, '0')}.jpg`}
                        layerNumber={i + 1}
                        active={i === layerIndex}
                        index={i}
                        onClick={setLayerIndex}
                        key={`histology-thumb-${orientations[orientation].name}-${i}`}
                      />
                    )
                  })
                }
              </div>

            </div>

          </div>

        </div>
      </div>


      <div className='bar right histology'>
        <div className='controls top'>
          <div className='control__element'>
            <Radio
              initial={orientation}
              onChange={onOrientationChange}
            >
              {
                orientations.map((orientation, index) => {
                  return (<Icon name={orientation.name} label={orientation.name} key={`histology-icon-o-${index}`} row={true} />)
                })
              }
            </Radio>
          </div>
          <p className='plus'> + </p>
          <div className='control__element'>
            <Icon name='cartilage' label='Cartilage' active={cartilage} onClick={onToggleCartilage} row={true} />
          </div>
          <div className='control__element'>
            <Radio
              initial={stain}
              onChange={setStain}
            >
              {
                stains.map((stain, index) => {
                  return (<Icon name={stain} label={stain} key={`histology-icon-s-${index}`} row={true} />)
                })
              }
            </Radio>
          </div>
        </div>

        <div className='controls'>
          <div className='control__element'>
            <Icon name='center' label='Center' onClick={onCenterCanvas} />
          </div>

          <div className='control__element'>
            <Toggle
              label='Outline'
              offLabel='off'
              onLabel='on'
              initial={outline}
              size='small'
              onChange={() => setOutline(g => !g)}
            />
          </div>

          <div className='control__element'>
            <Slider
              name='Opacity'
              onChange={(e) => setOpacity(e.target.value)}
              value={opacity}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div className='control__element'>
            <Slider
              name='Zoom'
              onChange={(e) => setZoom(e.target.value)}
              value={zoom}
              min={100}
              max={400}
              step={1}
            />
          </div>

          <div className='control__element -last'>
            <a href={`assets/histology-annotated/cuttlefish-histology-${orientations[orientation].name}.zip`}>
              <Icon name='download' label='Download' />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}