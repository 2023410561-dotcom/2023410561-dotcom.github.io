import React, { useEffect, useRef } from 'react'

/**
 * 自定义光标（参考站同款细线圆环 + 中心点）
 * 仅桌面端（pointer: fine）生效，hover 链接/按钮时圆环放大
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    // 仅桌面端启用
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('has-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    let hovering = false

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      // 中心点直接跟随
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      // 检测是否 hover 可点击元素
      const target = e.target.closest('a, button, .cursor-target')
      hovering = Boolean(target)
      ring.classList.toggle('is-hovering', hovering)
    }

    // 圆环用 rAF 缓动跟随，制造参考站的"磁吸拖尾"感
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.16
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.16
      ring.style.left = `${ringPos.current.x}px`
      ring.style.top = `${ringPos.current.y}px`
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
