import { useEffect, useRef, memo } from "react"

export const HistologyThumbnail = memo(({ src, layerNumber, active, index, onClick }) => {
  const ref = useRef()

  useEffect(() => {
    if (active) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }, [active])


  return (
    <div
      className={`thumbnail ${active ? '-active' : ''}`}
      onClick={() => onClick(index)}
      ref={ref}
    >
      <div className='img__wrapper'>
        <img src={src} alt="thumbnail" />
      </div>
      <p> {layerNumber} </p>
    </div>
  )
})