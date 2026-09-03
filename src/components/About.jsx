import React from 'react'
import useCountUp from '../hooks/useCountUp.js'

const stats = [
  { value: '41', unit: '万+', label: '单条最高播放' },
  { value: '500', unit: '+', label: '单条最高转化' },
  { value: '300', unit: '+', label: '单品系列量产' },
  { value: '3-4', unit: '个', label: '矩阵账号日更', accent: true },
]

const contacts = [
  { label: '电话', value: '15977543875', dot: true },
  { label: '邮箱', value: '2023410561@qq.com', dot: true },
  { label: '所在地', value: '广东深圳', dot: false },
  { label: '微信', value: 'bblibye', dot: true },
]

function StatValue({ stat }) {
  const [ref, value] = useCountUp(Number(stat.value))
  const className = `about-stat-value${stat.accent ? ' accent' : ''}`
  if (stat.accent) {
    return (
      <div className={className}>
        <span>{stat.value}</span>
        <sup>{stat.unit}</sup>
      </div>
    )
  }
  return (
    <div className={className}>
      <span ref={ref}>{value}</span>
      <sup>{stat.unit}</sup>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-label reveal">
          01 · 关于我 / ABOUT
        </div>
        <h2 className="section-title reveal">
          <em>黎静蕾</em><br />
          TK 海外剪辑师 / 矩阵运营
        </h2>
        <p className="section-subtitle reveal">
          数字媒体技术科班出身，从实习到正式加入 TikTok 矩阵运营团队。
        </p>

        <div className="about-grid">
          {/* 左侧：胶带贴纸照片墙 */}
          <div className="about-photo-wall reveal">
            <div className="photo-frame photo-frame-1">
              <span className="corner-tape corner-tape-tl" />
              <span className="corner-tape corner-tape-br" />
              <div className="photo-frame-inner photo-frame-portrait">
                <img src="/images/avatar.jpg" alt="黎静蕾" className="about-avatar-img" />
              </div>
            </div>
          </div>

          {/* 右侧：信息区 */}
          <div className="about-info">
            <div className="about-intro reveal">
              <h3 className="about-name">黎静蕾</h3>
              <div className="about-role">
                TK EDITOR · MATRIX OPERATOR
              </div>
            </div>

            <p className="about-bio reveal">
              2025届毕业生，数字媒体技术专业背景。
              近两年里，从实习到 TikTok 海外剪辑师，跑了 3 段工作经历，
              累计产出 <strong>500+ 条矩阵短视频</strong>，
              最高单条 <strong>41 万+ 播放 / 500+ 单转化</strong>。
              <br /><br />
              擅长 <em>AI 生成 → 人工精修 → 矩阵分发</em> 标准化流水线。
            </p>

            <div className="about-stats reveal">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <StatValue stat={stat} />
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="about-contacts reveal">
              {contacts.map((c) => (
                <div key={c.label} className="about-contact-pill">
                  {c.dot && <span className="dot" />}
                  <span style={{ color: 'var(--text-tertiary)', marginRight: '4px' }}>{c.label}:</span>
                  <span>{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}