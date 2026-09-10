import type { CSSProperties } from 'react'

// Fixed positions keep the server and browser markup identical.
const stars = [{ x: 4, y: 12, size: 17 }, { x: 95, y: 31, size: 25 }, { x: 3, y: 56, size: 22 }, { x: 97, y: 82, size: 14 }]
export default function NightSky() {
  return <div className='night-sky' aria-hidden='true'>
    <svg className='pixel-moon' width='52' height='64' viewBox='0 0 16 20' shapeRendering='crispEdges'><path d='M8 0h4v2H8v2H6v3H4v6h2v3h3v2h5v-2h2v2h-2v2H6v-2H3v-2H1v-3H0V7h1V4h2V2h5Z' fill='currentColor'/></svg>
    {stars.map((star, index) => <svg key={index} className='pixel-star' style={{ left: `${star.x}%`, top: `${star.y}%`, animationDelay: `${index * -1.7}s` }} width={star.size} height={star.size} viewBox='0 0 9 9' shapeRendering='crispEdges'><path d='M4 0h1v2h1v1h1v1h2v1H7v1H6v1H5v2H4V7H3V6H2V5H0V4h2V3h1V2h1Z' fill='currentColor'/></svg>)}
    {Array.from({ length: 12 }, (_, index) => <i key={index} className='pixel-ash' style={{ '--ash-x': `${index % 2 ? 96 - index % 4 : 1 + index % 4}%`, '--ash-y': `${12 + index * 7}%`, '--ash-delay': `${index * -1.3}s`, '--ash-duration': `${8 + index % 5}s` } as CSSProperties} />)}
  </div>
}
