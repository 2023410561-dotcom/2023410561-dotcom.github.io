import React from 'react'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        {/* 顶部小标签 */}
        <div className="hero-meta hero-enter" style={{ animationDelay: '0s' }}>
          <span>LIJINGLEI / 黎静蕾</span>
          <span className="hero-meta-dot" />
          <span>PORTFOLIO · 2026</span>
          <span className="hero-meta-dot" />
          <span>SHENZHEN, CN</span>
        </div>

        {/* 主标题：仿 Muzi 风格的「手写 portfolio 大字 + 中文说明」 */}
        <div className="hero-title-wrap hero-enter" style={{ animationDelay: '0.15s' }}>
          <h1 className="hero-portfolio">
            <span className="hero-portfolio-script">portfolio</span>
            <svg
              className="hero-portfolio-heart"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 27.5 C 8 21, 4 16, 4 11 C 4 7, 7 4.5, 10.5 4.5 C 13 4.5, 15 6, 16 8.5 C 17 6, 19 4.5, 21.5 4.5 C 25 4.5, 28 7, 28 11 C 28 16, 24 21, 16 27.5 Z" />
            </svg>
          </h1>
          <div className="hero-portfolio-cn">
            <span className="hero-portfolio-cn-dot">·</span>个人作品集
          </div>
          <div className="hero-portfolio-tags">
            TikTok 海外剪辑师 · 短视频矩阵运营 · 矩阵搭建 0–1
          </div>
        </div>

        {/* 「点我进入」按钮 */}
        <a
          href="#projects"
          className="hero-enter-btn hero-enter"
          style={{ animationDelay: '0.4s' }}
        >
          <span>查看作品</span>
          <span className="hero-enter-btn-icon">✦</span>
        </a>

        {/* 下方两栏描述（替代原 WHO/WHAT） */}
        <div className="hero-description">
          <div className="hero-description-block hero-enter" style={{ animationDelay: '0.55s' }}>
            <h4>我是谁</h4>
            <p>
              <strong>黎静蕾</strong>，2025届毕业生，数字媒体技术专业。
              <strong>近两年工作</strong>经验，从实习到 TikTok 矩阵运营，
              <strong>独立完成选题—拍摄—剪辑—发布全流程</strong>。
            </p>
          </div>

          <div className="hero-description-block hero-enter" style={{ animationDelay: '0.65s' }}>
            <h4>能做什么</h4>
            <p>
              3C 数码 / 家居 / 护肤三大品类；AI 生成 → 人工精修 → 矩阵分发
              标准化流水线；单条视频最高 <strong>41 万+ 播放 / 500+ 单转化</strong>。
            </p>
          </div>

          <div className="hero-description-block hero-enter" style={{ animationDelay: '0.75s' }}>
            <h4>沟通风格</h4>
            <p>
              <strong>温和，但不将就</strong>——靠谱交付、主动同步进度，
              长期合作比单次爆款更重要。
            </p>
          </div>
        </div>
      </div>

      {/* Decorative geometric elements (保留，不尬) */}
      <svg className="hero-deco hero-deco-star float-slow" viewBox="0 0 60 60" fill="none">
        <path d="M30 5 L33 27 L55 30 L33 33 L30 55 L27 33 L5 30 L27 27 Z" stroke="var(--aquamarine)" strokeWidth="1" />
      </svg>
      <svg className="hero-deco hero-deco-plus float-slower" viewBox="0 0 32 32" fill="none">
        <path d="M16 4 L16 28 M4 16 L28 16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="hero-deco hero-deco-line" />
      <div className="hero-deco hero-deco-circle float-slow" />
      <svg className="hero-deco hero-deco-cross float-slower" viewBox="0 0 40 40" fill="none">
        <path d="M20 6 L20 34 M6 20 L34 20 M11 11 L29 29 M29 11 L11 29" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="hero-scroll-cue">SCROLL TO EXPLORE</div>
    </section>
  )
}