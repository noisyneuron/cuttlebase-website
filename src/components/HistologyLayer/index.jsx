import './index.scss'
import { useState, useEffect, useCallback, useRef, forwardRef } from 'react'
import SVG from 'react-inlinesvg'
import { useMenuState } from '../../util/MenuProvider'
import { stains, breadcrumbs, regions } from '../../data/brain.json'


const Annotation = forwardRef((
  { orientation, layerIndex, active, outline, opacity, onHover, ...props },
  ref
) => {
  const [styleObj, setStyleObj] = useState({ '--opacity': 0 })
  const { currentSelection } = useMenuState()
  const innerRef = useRef()

  function updateRegionVisibility() {
    if (innerRef.current) {
      for (let path of innerRef.current.children) {
        path.classList.add('-hidden')
        currentSelection.forEach(selection => {
          if (path.classList.contains(`svg-region-${selection}`)) {
            path.classList.remove('-hidden')
          }
        })
      }
    }
  }

  useEffect(updateRegionVisibility, [currentSelection, innerRef])

  useEffect(() => {
    setStyleObj({ '--opacity': opacity })
  }, [opacity])

  const onMouseOver = useCallback((event) => {
    if (event.target.tagName === 'path' && event.target.classList.length === 1) {
      const className = event.target.classList[0]
      const partName = className.replace('svg-region-', '')
      if (breadcrumbs[partName]) {
        ref.current.breadcrumbRef.innerText = breadcrumbs[partName].path
        ref.current.functionRef.innerText = breadcrumbs[partName].function
        ref.current.regionRef = regions[partName]
      } else {
        ref.current.breadcrumbRef.innerText = ''
        ref.current.functionRef.innerText = ''
        ref.current.regionRef = null
      }
    } else {
      ref.current.breadcrumbRef.innerText = ''
      ref.current.functionRef.innerText = ''
      ref.current.regionRef = null
    }
  }, [ref])

  return (
    <>
      <div
        className={`annotation__wrapper ${active ? '-active' : ''} ${outline ? '-outline' : ''}`}
        style={styleObj}
      >
        <SVG
          src={`assets/histology/${orientation}/svgs/${String(layerIndex).padStart(2, '0')}.svg`}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOver}
          innerRef={innerRef}
          onLoad={updateRegionVisibility}
        />
      </div>
    </>
  )
})


export const HistologyLayer = forwardRef((
  { layerIndex, orientation, isActive, activeStain, showCartilage, outline, opacity },
  ref
) => {

  return (
    <div className={`layer__set ${isActive ? '-active' : ''}`}>
      <div className={`stain__set`} key={`histology-${orientation}-${stains[activeStain]}-${layerIndex}`} >

        <div className={`image__wrapper`}>
          <img
            src={`assets/histology/${orientation}/full/${stains[activeStain]}/original/${String(layerIndex).padStart(2, '0')}.jpg`}
            alt="brain layer"
          />
        </div>

        <div className={`image__wrapper ${showCartilage ? '' : '-hide'}`}>
          <img
            src={`assets/histology/${orientation}/full/${stains[activeStain]}/cartilage/${String(layerIndex).padStart(2, '0')}.png`}
            alt="brain cartilage"
          />
        </div>
      </div>
      <Annotation
        orientation={orientation}
        layerIndex={layerIndex}
        active={isActive}
        outline={outline}
        opacity={opacity / 100}
        ref={ref}
        key={`histology-${orientation}-${layerIndex}-annotation`}
      />
    </div>
  )
})