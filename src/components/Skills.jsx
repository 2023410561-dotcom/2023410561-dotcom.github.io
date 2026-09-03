import React from 'react'

const skills = [
  {
    icon: '✦',
    title: '视频制作',
    description: '精通 PR / AE / 剪映全流程，AI 视频工具（可灵、即梦、Runway、Sora）做混剪与数字人内容。',
    tags: ['PR · AE', '剪映', '可灵', '即梦', 'Runway', 'Sora'],
    accent: '#8be8cb',
  },
  {
    icon: '◐',
    title: 'AI 内容流水线',
    description: '搭建「AI 生成 → 人工精修 → 矩阵分发」标准化流程，AI 脚本迭代与爆款复刻降本提效。',
    tags: ['AI 文案', '脚本迭代', '爆款复刻', '矩阵分发'],
    accent: '#7ea2aa',
  },
  {
    icon: '◆',
    title: '矩阵运营',
    description: '独立运营 3–4 个矩阵账号，覆盖美区、东南亚多平台，稳定日更与 SOP 沉淀。',
    tags: ['TikTok', 'YouTube', 'Instagram', 'Pinterest'],
    accent: '#9c7a97',
  },
  {
    icon: '◇',
    title: '创意与卖点',
    description: '擅长效果对比类创意与精准卖点表达，多条视频播放突破 5 万+，爆款率高于均值。',
    tags: ['效果对比', '卖点表达', '本地化文案', '趋势选题'],
    accent: '#888da7',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      {/* Wave divider from Projects (bg-mid) into Skills (bg-deep) */}
      <svg
        className="wave-divider"
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        style={{ color: 'var(--bg-mid)' }}
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M0 32 C 240 6, 480 30, 720 16 S 1200 30, 1440 14 L 1440 32 L 0 32 Z"
          stroke="rgba(139, 232, 203, 0.14)"
          strokeWidth="1"
          fill="currentColor"
        />
      </svg>

      <div className="container">
        <div className="section-label reveal">
          03 · 个人优势 / SKILLS
        </div>
        <h2 className="section-title reveal">
          不止剪辑，<br />还有<em>内容判断力</em>
        </h2>
        <p className="section-subtitle reveal">
          专业不是工具列表，而是用对工具解决对的问题。
          近两年的实战沉淀，让我能快速进入任何一个新账号的节奏。
        </p>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <article
              key={skill.title}
              className={`skill-card reveal reveal-delay-${(i % 4) + 1}`}
              style={{ '--accent-color': skill.accent }}
            >
              <span className="skill-num">0{i + 1}</span>
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-tags">
                {skill.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
