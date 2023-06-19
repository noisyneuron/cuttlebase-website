import './index.scss'

export function Video({ src, ...props }){
  return (
    <div className='video-wrapper'>
      <iframe
        src={src}
        frameBorder="0"
        title="cuttlefish video"
      />
    </div>
  )
}