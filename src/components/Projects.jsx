import React, { useRef, useState, useEffect } from 'react'
import ProjectDetail from './ProjectDetail.jsx'

// 作品分类板块
// 4 大板块 × 各 3-4 个作品：每个板块以卡片形式呈现作品网格，点击作品可进入纵向 TikTok 风视频 Feed。
//
// 数据约定（供后期自己补视频）：
//   - src 为空的作品 = 「预留槽位」，访客端自动隐藏；补上 public/videos/ 下的文件路径即可上线
//   - conv / engage 为可选转化数据（如 '500+ 单' / '互动 1500+'），留空则行内不展示
const categories = [
  {
    id: 1,
    key: 'mixcut',
    name: '混剪类',
    subtitle: '二次创作 · 节奏卡点',
    description:
      '使用已有素材进行二次创作的视频，重点展示剪辑节奏、BGM 卡点、转场设计和信息重组能力。',
    icon: 'scissors',
    accent: 'var(--aquamarine)',
    tags: ['节奏卡点', '信息重组', 'BPM 卡点'],
    works: [
      { id: 'mc1', title: '家居 · 日区混剪爆款', tags: ['#混剪', '#日区', '#节水花洒', '#产品展示'], views: '41万+', src: '/videos/v0-shower-jp.mp4', conv: '', engage: '' },
      { id: 'mc2', title: '3C · 泰区混剪爆款', tags: ['#混剪', '#泰区', '#偏振镜', '#3C'], views: '33万+', src: '/videos/v3.mp4', conv: '', engage: '' },
      { id: 'mc3', title: '个护 · 美区混剪爆款', tags: ['#混剪', '#美区', '#个护', '#护肤', '#种草'], views: '10万+', src: '/videos/v7-care-mixcut-us.mp4', conv: '', engage: '' },
      { id: 'mc4', title: '3C · 泰区产品展示', tags: ['#混剪', '#泰区', '#自拍杆', '#产品展示'], views: '5万+', src: '/videos/v6-savetik-7612504.mp4', conv: '', engage: '' },
    ],
  },
  {
    id: 2,
    key: 'live',
    name: '实拍类',
    subtitle: '亲拍主导 · 真实质感',
    description:
      '亲自参与或主导拍摄的视频，涵盖产品静帧、模特走位与场景布光，强调真实质感与画面控制力。',
    icon: 'camera',
    accent: 'var(--sand-gold, #E6C896)',
    tags: ['实拍布光', '模特走位', '产品静帧'],
    works: [
      { id: 'lv1', title: '3C · 自带线移动电源', tags: ['#实拍', '#移动电源', '#自带线'], views: '5万+', src: '/videos/v8-savetik-7597393.mp4', conv: '', engage: '' },
      { id: 'lv2', title: '3C · 磁吸手机补光灯', tags: ['#实拍', '#补光灯', '#磁吸', '#手机自拍'], views: '5万+', src: '/videos/v10-savetik-7649714301829188882.mp4', conv: '', engage: '' },
      { id: 'lv3', title: '3C · 蓝牙三脚架自拍杆', tags: ['#实拍', '#自拍杆', '#三脚架', '#蓝牙遥控'], views: '5万+', src: '/videos/v4.mp4', conv: '', engage: '' },
      { id: 'lv4', title: '个护 · 电动剃须刀', tags: ['#实拍', '#剃须刀', '#电动'], views: '26万+', src: '/videos/v2.mp4', conv: '', engage: '' },
      { id: 'lv5', title: '个护 · 热敷颈椎按摩仪', tags: ['#实拍', '#颈部按摩仪', '#热敷', '#颈椎'], views: '18万+', src: '/videos/v1.mp4', conv: '', engage: '' },
      { id: 'lv6', title: '家居场景 · 自然光拍摄', tags: ['#实拍', '#场景'], views: '—', src: '' },
      { id: 'lv7', title: '美区护肤 · 开箱特写', tags: ['#实拍', '#开箱'], views: '—', src: '' },
    ],
  },
  {
    id: 3,
    key: 'ai',
    name: 'AI 生成类',
    subtitle: 'AI 辅助 · Prompt 设计',
    description:
      '使用 AI 工具（如 Midjourney、HeyGen、ElevenLabs 等）辅助生成素材并整合进视频的作品。重点展示 Prompt 设计能力和工具应用能力。',
    icon: 'sparkles',
    accent: 'var(--aquamarine)',
    tags: ['可灵 AI', '即梦 AI', 'HeyGen', 'Runway'],
    works: [
      { id: 'ai1', title: '家居 · 桌面氛围加湿器', tags: ['#AI', '#家居', '#加湿器', '#桌面'], views: '—', src: '/videos/v11-savetik-7576984565642824967.mp4', conv: '', engage: '' },
      { id: 'ai2', title: '个护 · 美甲光疗灯', tags: ['#AI', '#个护', '#美甲灯', '#光疗'], views: '—', src: '/videos/v12-savetik-7589597360649522453.mp4', conv: '', engage: '' },
      { id: 'ai3', title: '3C · 迷你三脚架自拍杆', tags: ['#AI', '#3C', '#自拍杆', '#便携'], views: '—', src: '/videos/v13-savetik-7644508259398847764.mp4', conv: '', engage: '' },
      { id: 'ai4', title: '3C · 手持便携小风扇', tags: ['#AI', '#3C', '#小风扇', '#手持'], views: '—', src: '/videos/v14-savetik-7643777413125557512.mp4', conv: '', engage: '' },
      { id: 'ai5', title: '个护 · 挂脖颈部按摩仪', tags: ['#AI', '#个护', '#颈部按摩仪', '#挂脖'], views: '—', src: '/videos/v15-savetik-7643011105345916181.mp4', conv: '', engage: '' },
    ],
  },
  {
    id: 4,
    key: 'brand',
    name: '品宣类',
    subtitle: '产品宣传 · 橱窗视频',
    description:
      '主要为产品链接的橱窗短视频与产品宣传片，',
    icon: 'star',
    accent: 'var(--sand-gold, #E6C896)',
    tags: ['产品宣传', '橱窗视频', '卖点展示'],
    works: [
      { id: 'br1', title: '3C · 磁带清洁套装', tags: ['#品宣', '#3C', '#磁带', '#清洁套装', '#磁头清洁'], views: '—', src: '/videos/v16.mp4', aspectRatio: '16/9', conv: '', engage: '' },
      { id: 'br2', title: '3C · 手机直播三脚架', tags: ['#品宣', '#3C', '#自拍杆', '#三脚架', '#直播'], views: '—', src: '/videos/v17.mp4', aspectRatio: '16/9', conv: '', engage: '' },
      { id: 'br3', title: '3C · 复古磁带播放机', tags: ['#品宣', '#3C', '#磁带', '#播放机', '#转录'], views: '—', src: '/videos/v18.mp4', aspectRatio: '16/9', conv: '', engage: '' },
      { id: 'br4', title: '3C · 物品防丢定位器', tags: ['#品宣', '#3C', '#定位器', '#防丢'], views: '—', src: '/videos/v19.mp4', aspectRatio: '16/9', conv: '', engage: '' },
    ],
  },
]

// 板块图标（内联 SVG，统一 24×24 网格）
function CategoryIcon({ name }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'scissors':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      )
    case 'camera':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
          <path d="M12 8l1.5 3.5L17 13l-3.5 1.5L12 18l-1.5-3.5L7 13l3.5-1.5z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'star':
      return (
        <svg {...common} aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}

// 单条作品行：缩略图（hover 静音预览 + 时长角标）+ 标题 + 播放/转化数据 + 标签
// 点击后告诉父级「从这条作品开始播」（startIndex）
function WorkItem({ work, index, onOpen }) {
  const videoRef = useRef(null)
  const timerRef = useRef(null)
  const [duration, setDuration] = useState(null)
  const [previewing, setPreviewing] = useState(false)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleEnter = () => {
    setPreviewing(true)
    const v = videoRef.current
    if (!v) return
    // 小延迟避免滑过误触，随后静音播几秒预览
    timerRef.current = setTimeout(() => {
      try {
        v.currentTime = 0.05
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch { /* 忽略异常 */ }
    }, 180)
  }

  const handleLeave = () => {
    setPreviewing(false)
    clearTimeout(timerRef.current)
    const v = videoRef.current
    if (!v) return
    try {
      v.pause()
      v.currentTime = 0
    } catch { /* 忽略异常 */ }
  }

  const handleLoaded = () => {
    const v = videoRef.current
    if (v && v.duration && isFinite(v.duration)) setDuration(v.duration)
  }

  const formatTime = (s) => {
    if (!s || !isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  return (
    <button
      type="button"
      className={`category-work cursor-target ${previewing ? 'is-previewing' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(index)}
      aria-label={`查看作品：${work.title}`}
    >
      <span className="category-work-thumb">
        <video
          ref={videoRef}
          src={work.src}
          muted
          playsInline
          preload="metadata"
          className="category-work-video"
          onLoadedMetadata={handleLoaded}
        />
        {duration !== null && (
          <span className="category-work-duration">{formatTime(duration)}</span>
        )}
      </span>
      <span className="category-work-body">
        <span className="category-work-title">{work.title}</span>
        <span className="category-work-meta">
          {work.views && work.views !== '—' && (
            <span className="category-work-views">
              <span className="category-work-views-dot" aria-hidden="true">▶</span>
              {work.views}
            </span>
          )}
          {work.conv && <span className="category-work-stat">{work.conv}</span>}
          {work.engage && <span className="category-work-stat">{work.engage}</span>}
          {work.tags.map((tag) => (
            <span key={tag} className="category-work-tag">{tag}</span>
          ))}
        </span>
      </span>
    </button>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  // 构造纵向 Feed 数据：只把有 src 的视频放进合集（访客端看不到空槽位/编辑态占位）
  const buildFeed = (cat, startIndex = 0) => ({
    ...cat,
    videos: cat.works
      .filter((w) => w.src)
      .map((w) => ({
        id: w.id,
        title: w.title,
        src: w.src,
        views: w.views === '—' ? null : w.views,
        aspectRatio: w.aspectRatio || '9/16',
      })),
    startIndex,
  })

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-label reveal">
          02 · 作品分类 / CATEGORIES
        </div>
        <h2 className="section-title reveal">
          四大板块，<br />多维<em>作品矩阵</em>
        </h2>

        <div className="projects-grid">
          {categories.map((cat, i) => {
            const visibleWorks = cat.works.filter((w) => w.src)
            const workCount = visibleWorks.length
            const coverVideo = visibleWorks[0]

            return (
              <article
                key={cat.id}
                className={`project-card category-card reveal reveal-delay-${(i % 2) + 1}`}
                style={{ '--category-accent': cat.accent }}
              >
                <span className="corner-tape corner-tape-tl" />
                <span className="corner-tape corner-tape-tr" />

                {/* 板块封面：参考图（飞蛾）氛围底 + 编号 + icon + 名称 + 副标题 */}
                <div className="project-cover">
                  <img
                    className="project-cover-img-bg"
                    src="/covers/moth-bg.jpg"
                    alt=""
                    aria-hidden="true"
                    style={{ objectPosition: `${(cat.id - 1) * 30}% ${cat.id % 2 === 0 ? 75 : 25}%` }}
                  />
                  {coverVideo && (
                    <video
                      className="project-cover-video-bg"
                      src={coverVideo.src}
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        const v = e.currentTarget
                        if (v.duration > 0.1) v.currentTime = 0.05
                      }}
                    />
                  )}
                  <div className="project-cover-bg" />
                  <div className="project-cover-meta">
                    <span className="project-cover-num">0{cat.id}</span>
                    <span className="project-cover-period">
                      {workCount > 0 ? `${workCount} 件作品` : '筹备中'}
                    </span>
                  </div>
                  <div className="category-cover-head">
                    <div className="category-icon" aria-hidden="true">
                      <CategoryIcon name={cat.icon} />
                    </div>
                    <div className="category-cover-titles">
                      <div className="project-cover-title">{cat.name}</div>
                      <div className="category-cover-subtitle">{cat.subtitle}</div>
                    </div>
                  </div>
                  <div className="project-cover-tags">
                    {cat.tags.map((tag) => (
                      <span key={tag} className="project-cover-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* 板块信息区：描述 + 作品列表 + CTA */}
                <div className="project-info">
                  <h3 className="project-title">{cat.name}</h3>
                  {cat.description && <p className="project-description">{cat.description}</p>}

                  {workCount > 0 ? (
                    <div className="category-works">
                      {visibleWorks.map((work, idx) => (
                        <WorkItem
                          key={work.id}
                          work={work}
                          index={idx}
                          onOpen={(startIndex) => setActiveProject(buildFeed(cat, startIndex))}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="category-works-empty">
                      <span className="category-works-empty-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 3" />
                        </svg>
                      </span>
                      <div className="category-works-empty-title">更多作品 · 持续更新中</div>
                      <div className="category-works-empty-text">作品正在制作打磨，上线后会第一时间展示在这里</div>
                    </div>
                  )}

                  {workCount > 0 && (
                    <button
                      type="button"
                      className="card-arrow cursor-target"
                      onClick={() => setActiveProject(buildFeed(cat, 0))}
                    >
                      查看完整合集
                      <span className="arrow-icon">→</span>
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {activeProject && (
        <ProjectDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  )
}
