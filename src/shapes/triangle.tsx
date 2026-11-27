import { useMemo, type CSSProperties } from 'react'
import { roundedPolygonPath, type Pt } from '~/lib/rounded-polygon'

type Corners = {
  topLeft?: number
  bottomLeft?: number
  bottomRight?: number
}

type Props = {
  corners?: Corners // 0 = tajam, makin besar makin bulat (satuan 0–100)
  className?: string
  style?: CSSProperties
}

// Siku-siku di kiri-bawah
const POINTS: Pt[] = [
  [0, 0],
  [0, 100],
  [100, 100],
]

const RoundedTriangle = ({ corners, className = '', style }: Props) => {
  const { topLeft = 8, bottomLeft = 8, bottomRight = 8 } = corners ?? {}

  const mask = useMemo(() => {
    const d = roundedPolygonPath(POINTS, [topLeft, bottomLeft, bottomRight])
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<path d='${d}' fill='black'/></svg>`
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  }, [topLeft, bottomLeft, bottomRight])

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        ...style,
      }}
    />
  )
}

export default RoundedTriangle