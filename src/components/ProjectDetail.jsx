import React, { useEffect, useRef, useState, useCallback } from 'react'

/**
 * ProjectDetail — 点开项目卡片后的「纵向视频 Feed」弹窗
 *
 * 布局：进入直接是第 1 个视频，每个视频以「9:16 竖屏」居中容器承载，
 *       鼠标滚轮 / 触摸板 上下翻页；右侧 ↑/↓ 大圆形箭头按钮（64px），
 *       中间细长圆点指示器；键盘 ←→/↑↓ 也支持。
 *
 * 播放策略：
 *   - 浏览器 autoplay 政策要求首次必须有用户交互，因此进入 modal 时
 *     视频默认 paused=true（视频画面已显示但不自动播放），并在视频上
 *     叠加中央"▶ 播放（含声音）"按钮。
 *   - 用户点一下后整组视频开启声音（muted=false）并自动播放。
 *   - 之后滚轮/箭头切换时新视频会自动 play()。
 *   - 点击视频本身可暂停/继续。
 *
 * 进度条：
 *   - 每个视频底部都有进度条（与视频画面同宽）
 *   - 显示当前时间 / 总时长
 *   - 支持点击 / 拖拽跳转
 */
export default function ProjectDetail({ project, onClose }) {
  const feedRef = useRef(null)
  const videoRefs = useRef([])
  // 支持从指定作品开始播放（点卡片第 N 条 → Feed 直接定位到第 N 条）
  const initialIndex = Math.max(0, Math.min(project.startIndex || 0, project.videos.length - 1))
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)
  const [pausedByUser, setPausedByUser] = useState(false)

  // 进度条状态（按视频索引保存：currentTime + duration + buffered）
  const [progress, setProgress] = useState({}) // idx -> { current, duration, buffered }

  // 用 ref 跟踪当前页（避免连续点击被 React 闭包困在同一页）
  const activeIndexRef = useRef(0)
  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const totalPages = project.videos.length

  // ESC / 方向键 / 空格控制 + 滚动锁定
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === 'ArrowRight' && e.altKey)) {
        e.preventDefault()
        goBy(1)
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === 'ArrowLeft' && e.altKey)) {
        e.preventDefault()
        goBy(-1)
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, []) // eslint-disable-line

  // 监听滚动，定位当前 active 视频页
  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    const onScroll = () => {
      const pages = el.querySelectorAll('.project-detail-page')
      const centerY = el.scrollTop + el.clientHeight / 2
      let nearest = 0
      let minD = Infinity
      pages.forEach((p, i) => {
        const mid = p.offsetTop + p.offsetHeight / 2
        const d = Math.abs(mid - centerY)
        if (d < minD) { minD = d; nearest = i }
      })
      setActiveIndex((prev) => (prev === nearest ? prev : nearest))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // 打开时直接定位到起始页（用 scrollTop 立即跳转，避免从顶部闪过）
  useEffect(() => {
    if (initialIndex <= 0) return
    const el = feedRef.current
    if (!el) return
    const pages = el.querySelectorAll('.project-detail-page')
    const target = pages[initialIndex]
    if (target) el.scrollTop = target.offsetTop
  }, []) // eslint-disable-line

  // 当前页视频自动播放 / 暂停
  useEffect(() => {
    if (!started) return
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === activeIndex) {
        if (pausedByUser) {
          v.pause()
        } else {
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        }
      } else {
        v.pause()
        v.currentTime = 0
      }
    })
  }, [activeIndex, started, pausedByUser])

  const goTo = (idx) => {
    const el = feedRef.current
    if (!el) return
    const pages = el.querySelectorAll('.project-detail-page')
    const target = pages[idx]
    if (target) el.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
  }
  const goBy = (delta) => {
    const cur = activeIndexRef.current
    const next = Math.max(0, Math.min(totalPages - 1, cur + delta))
    if (next !== cur) goTo(next)
  }

  const handleStart = () => {
    setStarted(true)
    setPausedByUser(false)
    setMuted(false)
    // 从当前所在页开始播放（支持从指定作品进入）
    const active = videoRefs.current[activeIndex]
    if (active) {
      active.currentTime = 0
      const p = active.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }

  const handleVideoClick = () => {
    if (!started) { handleStart(); return }
    const v = videoRefs.current[activeIndex]
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPausedByUser(false)
    } else {
      v.pause()
      setPausedByUser(true)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    setMuted((m) => !m)
  }

  const prevVideo = (e) => { e.stopPropagation(); goBy(-1) }
  const nextVideo = (e) => { e.stopPropagation(); goBy(+1) }

  // 进度条：监听当前 active 视频的 timeupdate + loadedmetadata
  // 同时把所有视频的缓冲结束也记录下来
  const attachVideoProgress = useCallback((videoEl, idx) => {
    if (!videoEl) return
    const onTimeUpdate = () => {
      setProgress((prev) => ({
        ...prev,
        [idx]: {
          current: videoEl.currentTime || 0,
          duration: videoEl.duration && isFinite(videoEl.duration) ? videoEl.duration : (prev[idx]?.duration || 0),
          buffered: videoEl.buffered && videoEl.buffered.length ? videoEl.buffered.end(videoEl.buffered.length - 1) : (prev[idx]?.buffered || 0),
        },
      }))
    }
    const onLoaded = () => {
      setProgress((prev) => ({
        ...prev,
        [idx]: {
          ...(prev[idx] || {}),
          duration: videoEl.duration && isFinite(videoEl.duration) ? videoEl.duration : 0,
        },
      }))
    }
    videoEl.addEventListener('timeupdate', onTimeUpdate)
    videoEl.addEventListener('loadedmetadata', onLoaded)
    videoEl.addEventListener('durationchange', onLoaded)
  }, [])

  // 只为 active 视频同步进度（避免 4 个视频同时 setState 抖动）
  useEffect(() => {
    const v = videoRefs.current[activeIndex]
    if (!v) return
    if (v.duration && isFinite(v.duration)) {
      setProgress((prev) => ({
        ...prev,
        [activeIndex]: {
          current: v.currentTime || 0,
          duration: v.duration,
          buffered: v.buffered && v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0,
        },
      }))
    }
  }, [activeIndex])

  // 进度条拖拽 / 点击：写到 currentTime
  const scrubTo = (idx, ratio) => {
    const v = videoRefs.current[idx]
    const p = progress[idx]
    if (!v || !p || !p.duration) return
    const target = Math.max(0, Math.min(p.duration, ratio * p.duration))
    v.currentTime = target
    setProgress((prev) => ({ ...prev, [idx]: { ...(prev[idx] || p), current: target } }))
  }

  const formatTime = (sec) => {
    if (!sec || !isFinite(sec)) return '0:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }

  return (
    <div
      className="project-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name || project.title || '视频合集'} · 视频合集`}
      onClick={onClose}
    >
      <div
        className="project-detail-feed"
        ref={feedRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部关闭按钮 */}
        <button
          type="button"
          className="project-detail-close"
          onClick={onClose}
          aria-label="关闭"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6 L18 18 M18 6 L6 18" />
          </svg>
        </button>

        {/* 右侧上下控制组：↑ 按钮 + 圆点指示器 + ↓ 按钮 */}
        <div className="project-detail-side" aria-hidden="false">
          <button
            type="button"
            className="project-detail-side-btn"
            onClick={prevVideo}
            disabled={activeIndex === 0}
            aria-label="上一个视频"
            title="上一个视频 (↑)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 19 L12 5 M6 11 L12 5 L18 11" />
            </svg>
          </button>

          <div className="project-detail-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`project-detail-dot ${i === activeIndex ? 'is-active' : ''}`}
                onClick={(e) => { e.stopPropagation(); goTo(i) }}
                aria-label={`第 ${i + 1} 页`}
              />
            ))}
          </div>

          <button
            type="button"
            className="project-detail-side-btn"
            onClick={nextVideo}
            disabled={activeIndex === totalPages - 1}
            aria-label="下一个视频"
            title="下一个视频 (↓)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5 L12 19 M6 13 L12 19 L18 13" />
            </svg>
          </button>
        </div>

        {/* 滚轮提示 */}
        {!started && (
          <div className="project-detail-wheel-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 4 L12 20 M7 9 L12 4 L17 9" />
            </svg>
            <span className="hint-desktop">滚轮或箭头键 · 上下翻页</span>
            <span className="hint-mobile">上下滑动 · 翻看下一支</span>
          </div>
        )}

        {/* 每页一个视频 */}
        {project.videos.map((video, i) => {
          const isActive = i === activeIndex
          const pp = progress[i] || { current: 0, duration: 0, buffered: 0 }
          const pct = pp.duration > 0 ? (pp.current / pp.duration) * 100 : 0
          const bufPct = pp.duration > 0 ? (pp.buffered / pp.duration) * 100 : 0
          const ratioParts = (video.aspectRatio || '9/16').split('/').map(Number)
          const [rW, rH] = ratioParts.length === 2 && ratioParts[0] && ratioParts[1] ? ratioParts : [9, 16]
          const stageStyle = {
            aspectRatio: `${rW}/${rH}`,
            height: `min(100vh, calc(100vw * ${rH} / ${rW}))`,
            maxWidth: `min(100vw, calc(100vh * ${rW} / ${rH}))`,
          }

          return (
            <section
              key={video.id}
              className="project-detail-page project-detail-video-page"
            >
              <div className="project-detail-stage" style={stageStyle}>
                {video.src ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el
                      if (el) attachVideoProgress(el, i)
                    }}
                    className="project-detail-video"
                    src={video.src}
                    loop
                    muted={muted}
                    playsInline
                    preload="metadata"
                    onClick={handleVideoClick}
                  />
                ) : (
                  <div className="project-video-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                    <span>作品制作中 · 敬请期待</span>
                  </div>
                )}

                {/* 中央「开始播放」按钮 */}
                {isActive && !started && (
                  <button
                    type="button"
                    className="project-detail-play-overlay"
                    onClick={handleStart}
                    aria-label="点击播放（含声音）"
                  >
                    <span className="project-detail-play-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5 L19 12 L8 19 Z" />
                      </svg>
                    </span>
                    <span className="project-detail-play-text">
                      点击播放 · 含声音
                    </span>
                  </button>
                )}

                {/* 顶部工具栏：编号 + 静音切换 */}
                <div className="project-detail-video-topbar">
                  <div className="project-detail-video-num">
                    0{i + 1} / {String(project.videos.length).padStart(2, '0')}
                  </div>
                  {started && (
                    <button
                      type="button"
                      className="project-detail-mute-btn"
                      onClick={toggleMute}
                      aria-label={muted ? '开启声音' : '关闭声音'}
                      title={muted ? '开启声音' : '关闭声音'}
                    >
                      {muted ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M5 9 L9 9 L14 5 L14 19 L9 15 L5 15 Z" />
                          <path d="M17 9 L22 14 M22 9 L17 14" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M5 9 L9 9 L14 5 L14 19 L9 15 L5 15 Z" />
                          <path d="M17 8 C19 10 19 14 17 16" />
                          <path d="M20 5 C23 9 23 15 20 19" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {/* 视频底部标题 + 进度条 */}
                <div className="project-detail-video-info">
                  <div className="project-detail-video-title">{video.title}</div>

                  {/* 视频播放量徽章（TikTok 风格：红/绿 ▶ + 文字） */}
                  {video.views && (
                    <div className="project-detail-views-badge" aria-label={`播放量 ${video.views}`}>
                      <span className="project-detail-views-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5 L19 12 L8 19 Z" />
                        </svg>
                      </span>
                      <span className="project-detail-views-num">{video.views}</span>
                      <span className="project-detail-views-label">播放</span>
                    </div>
                  )}

                  {(project.period || project.company) && (
                    <div className="project-detail-video-meta">
                      {project.period && <span>{project.period}</span>}
                      {project.period && project.company && <span className="project-meta-dot" />}
                      {project.company && <span>{project.company}</span>}
                    </div>
                  )}

                  {/* 视频进度条（嵌在 info 内，跟着视频画面同宽） */}
                  {video.src && (
                    <div
                      className="project-detail-progress"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="project-detail-progress-row">
                        <div className="project-detail-progress-track" aria-hidden="true">
                          <div className="project-detail-progress-buffer" style={{ width: `${bufPct}%` }} />
                          <div className="project-detail-progress-fill" style={{ width: `${pct}%` }} />
                          <div className="project-detail-progress-thumb" style={{ left: `${pct}%` }} />
                          <input
                            type="range"
                            className="project-detail-progress-input"
                            min={0}
                            max={pp.duration || 0}
                            step={0.01}
                            value={pp.current}
                            onChange={(e) => scrubTo(i, Number(e.target.value) / (pp.duration || 1))}
                            aria-label="视频进度"
                          />
                        </div>
                        <div className="project-detail-progress-time">
                          <span>{formatTime(pp.current)}</span>
                          <span className="project-detail-progress-time-sep">/</span>
                          <span>{formatTime(pp.duration)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
