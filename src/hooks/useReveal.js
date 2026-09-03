import { useEffect } from 'react'

/**
 * 滚动揭示特效（参考站同款 IntersectionObserver 方案）
 * - 页面加载时已在视口内的元素立即可见
 * - 其余元素进入视口时再触发 fade-up 入场动画
 * - 含兜底：2s 后强制显示，避免无头/低性能环境永久隐藏
 */
export default function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return

    // 不支持 IntersectionObserver 时全部直接显示
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => {
      // 已经在视口内（包括上方滚动过的）直接可见，避免长页面 + 大视口时元素卡在 hidden
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('is-visible')
      } else {
        observer.observe(el)
      }
    })

    // 兜底：2s 后强制所有未可见元素显示
    const fallback = setTimeout(() => {
      document
        .querySelectorAll('.reveal:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'))
    }, 2000)

    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])
}
