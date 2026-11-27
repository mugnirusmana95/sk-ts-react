import { useEffect, useRef } from 'react'

type Options = {
  enabled?: boolean
  escape?: boolean
}

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  { enabled = true, escape = false }: Options = {},
) {
  const ref = useRef<T>(null)
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!enabled) return

    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handlerRef.current()
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (escape && e.key === 'Escape') handlerRef.current()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [enabled, escape])

  return ref
}