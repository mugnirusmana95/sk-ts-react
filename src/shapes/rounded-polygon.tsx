export type Pt = [number, number]

const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]]
const len = (v: Pt) => Math.hypot(v[0], v[1])
const unit = (v: Pt): Pt => {
  const l = len(v)
  return [v[0] / l, v[1] / l]
}

/** radii[i] = radius sudut ke-i (0 = tajam) */
export function roundedPolygonPath(points: Pt[], radii: number[]): string {
  const n = points.length
  const cmds: string[] = []

  points.forEach((cur, i) => {
    const prev = points[(i + n - 1) % n]
    const next = points[(i + 1) % n]
    const r = radii[i] ?? 0
    const cmd = i === 0 ? 'M' : 'L'

    // Sudut tajam: cukup titiknya saja
    if (r <= 0) {
      cmds.push(`${cmd}${cur[0]},${cur[1]}`)
      return
    }

    const toPrev = unit(sub(prev, cur))
    const toNext = unit(sub(next, cur))
    const cos = toPrev[0] * toNext[0] + toPrev[1] * toNext[1]
    const angle = Math.acos(Math.min(1, Math.max(-1, cos))) // sudut dalam
    const tan = Math.tan(angle / 2)

    // Jarak dari titik sudut ke awal lengkungan, dibatasi setengah sisi terpendek
    // supaya lengkungan dua sudut yang bersebelahan tidak saling tabrak
    const t = Math.min(r / tan, len(sub(prev, cur)) / 2, len(sub(next, cur)) / 2)
    const rr = t * tan

    const start: Pt = [cur[0] + toPrev[0] * t, cur[1] + toPrev[1] * t]
    const end: Pt = [cur[0] + toNext[0] * t, cur[1] + toNext[1] * t]

    // Arah belokan menentukan sweep-flag; dihitung otomatis dari urutan titik
    const d1 = sub(cur, prev)
    const d2 = sub(next, cur)
    const sweep = d1[0] * d2[1] - d1[1] * d2[0] > 0 ? 1 : 0

    cmds.push(`${cmd}${start[0]},${start[1]} A${rr},${rr} 0 0 ${sweep} ${end[0]},${end[1]}`)
  })

  return `${cmds.join(' ')} Z`
}