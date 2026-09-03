import React from 'react'

const methods = [
  {
    label: 'PHONE',
    value: '15977543875',
    hint: '',
    href: 'tel:15977543875',
  },
  {
    label: 'EMAIL',
    value: '2023410561@qq.com',
    hint: '24h 内回复',
    href: 'mailto:2023410561@qq.com',
  },
  {
    label: 'WECHAT',
    value: 'bblibye',
    hint: '添加时请注明来意',
    href: null,
    qr: '/images/wechat-qr.jpg',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-pretitle reveal">
          04 · 联系方式 / CONTACT
        </div>

        <h2 className="contact-title reveal">
          欢迎<em>合作</em>。
        </h2>

        <p className="contact-subtitle reveal">
          如果你有短视频矩阵、跨境内容、海外账号相关的需求，
          欢迎通过以下方式联系我。
        </p>

        <div className="contact-methods">
          {methods.map((m, i) => {
            const inner = (
              <>
                <div className="contact-method-label">{m.label}</div>
                {m.qr ? (
                  <div className="contact-method-qr">
                    <div className="qr-card">
                      <img src={m.qr} alt="微信二维码" />
                    </div>
                    {m.hint && <div className="contact-method-hint">{m.hint}</div>}
                  </div>
                ) : (
                  <>
                    <div className="contact-method-value">{m.value}</div>
                    {m.hint && <div className="contact-method-hint">{m.hint}</div>}
                  </>
                )}
              </>
            )
            return m.href ? (
              <a
                key={m.label}
                href={m.href}
                target={m.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`contact-method reveal reveal-delay-${(i % 4) + 1} cursor-target`}
              >
                {inner}
              </a>
            ) : (
              <div key={m.label} className={`contact-method reveal reveal-delay-${(i % 4) + 1} cursor-target`}>
                {inner}
              </div>
            )
          })}
        </div>

        <div className="contact-footer reveal">
          <span>© 2026 LIJINGLEI · TK EDITOR</span>
          <span>BUILT WITH REACT + VITE</span>
          <span>SHENZHEN, CN</span>
        </div>
      </div>
    </section>
  )
}
