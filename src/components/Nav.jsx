import React, { useState, useEffect } from 'react'

const navItems = [
  { label: '关于', href: '#about' },
  { label: '作品', href: '#projects' },
  { label: '能力', href: '#skills' },
  { label: '联系', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由到锚点时收起手机端菜单
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [menuOpen])

  return (
    <nav className="nav" style={scrolled ? { padding: '16px var(--gutter)' } : {}}>
      <a href="#hero" className="nav-logo">
        LIJINGLEI / 黎静蕾
      </a>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="nav-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">
        合作邀约
      </a>

      {/* 手机端汉堡按钮（≤768px 显示） */}
      <button
        type="button"
        className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* 手机端下拉菜单 */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            合作邀约
          </a>
        </div>
      )}
    </nav>
  )
}