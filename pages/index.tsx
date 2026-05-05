import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Work {
  id: string
  title: string
  description: string | null
  kind: string | null
  year: string | null
  icon_url: string | null
  screenshot_url: string | null
  external_url: string | null
  order_index: number
}

interface Writing {
  id: string
  title: string
  excerpt: string | null
  slug: string
  date: string
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function Nav() {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a href="#top" className="brand">
          <Image
            src="/lazydesk-logo-small.png"
            alt="Lazydesk Studio"
            width={240}
            height={164}
            className="brand-logo"
            priority
          />
          <span className="brand-name">Lazydesk<em>.</em>Studio</span>
        </a>
        <nav className="nav-links">
          <a href="#works" className="nav-primary">
            Works <span className="nav-arrow">↓</span>
          </a>
          <a href="#about">About</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
          <span className="nav-cta nav-cta-stay">
            <span className="dot" />
            <span>Available</span>
          </span>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lazydesk-logo.png"
        alt=""
        className="hero-logo hero-logo--watermark"
        aria-hidden="true"
      />
      <div className="shell">
        <h1 className="h-display hero-headline">
          <span className="line">Small, slow,</span>
          <span className="line">honest app</span>
          <span className="line">made <span className="accent">at a lazy desk.</span></span>
        </h1>
        <div className="hero-foot">
          <div className="hero-tag body-l">
            게으름이 허락된 책상에서 시작된 1인 창작 스튜디오
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head">
          <h2 className="h-section">About</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>현대 사회에서 책상은 대체로 생산성의 상징처럼 여겨졌습니다. 그래선지 앉는 순간 무언가 해야 할 것 같고, 아무것도 하지 않으면 왠지 뒤처지는 느낌이 들어요. 하지만 우리는 그 책상 위에서 자주 할 일을 미루고, 멍을 때리고, 괜히 책상 정리를 하기도 합니다. 그리고 사실은 그 느긋한 시간 속에서 진짜 아이디어가 떠오릅니다.</p>
            <p>레이지데스크 스튜디오(Lazydesk Studio)는 그런 게으름이 허락된 책상에서 시작된 1인 창작 스튜디오입니다. 기획, 디자인, 개발까지 모든 과정을 스스로 만들어가며, 누군가에게 필요하고 실용적인 (웹과 앱) 서비스를 만듭니다.</p>
            <p>빠르지 않아도 괜찮다는 믿음으로, 천천히 그러나 꾸준히 나아갑니다. 부지런한 새들이 서둘러서 먼저 벌레를 잡아도 괜찮아요. 저는 느긋하게 저만의 속도로 무언가를 만들고 있으니까요. 책상 앞에서.</p>
          </div>
          <div className="about-side">
            <div className="stack">
              <div className="row">
                <span className="k">Practice</span>
                <span className="v">Product design, frontend &amp; iOS development</span>
              </div>
              <div className="row">
                <span className="k">Tools</span>
                <span className="v">
                  <span className="tag">Figma</span>
                  <span className="tag">React</span>
                  <span className="tag">Swift</span>
                  <span className="tag">Tailwind</span>
                  <span className="tag">Postgres</span>
                </span>
              </div>
              <div className="row">
                <span className="k">Languages</span>
                <span className="v">한국어 · English</span>
              </div>
              <div className="row">
                <span className="k">Founded</span>
                <span className="v">2023, Seoul</span>
              </div>
              <div className="row">
                <span className="k">Lead time</span>
                <span className="v">대개 4 — 8주, 한 번에 한 프로젝트</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Works({ works }: { works: Work[] }) {
  return (
    <section className="section" id="works">
      <div className="shell">
        <div className="section-head">
          <h2 className="h-section">Works</h2>
        </div>
        <div className="works-list">
          {works.length === 0
            ? Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="row row-empty">
                  <span className="row-icon row-icon-empty" />
                  <span className="title" style={{ color: 'var(--ink-mute)' }}>—</span>
                  <span className="yr">—</span>
                  <span className="arrow" />
                </div>
              ))
            : works.map((w) => (
                <a
                  key={w.id}
                  href={w.external_url ?? '#'}
                  className="row"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="row-icon">
                    {w.icon_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={w.icon_url} alt={w.title} />
                    )}
                  </span>
                  <span className="title">{w.title}</span>
                  <span className="yr">{w.year ?? '—'}</span>
                  <span className="arrow">Visit →</span>
                </a>
              ))}
        </div>
      </div>
    </section>
  )
}

function WritingSection({ writings }: { writings: Writing[] }) {
  return (
    <section className="section" id="writing">
      <div className="shell">
        <div className="section-head">
          <h2 className="h-section">Writing</h2>
        </div>
        <div className="writing">
          {writings.length === 0
            ? Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="write-card write-card-empty">
                  <div className="write-meta"><span>—</span></div>
                  <h3 style={{ color: 'var(--ink-mute)' }}>Coming soon</h3>
                  <p style={{ color: 'var(--ink-mute)' }}>아직 쓰이지 않은 글.</p>
                  <span className="write-arrow" />
                </div>
              ))
            : writings.map((n) => (
                <Link key={n.id} href={`/writing/${n.slug}`} className="write-card">
                  <div className="write-meta">
                    <span>{formatDate(n.date)}</span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.excerpt}</p>
                  <span className="write-arrow">Read →</span>
                </Link>
              ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <h2 className="contact-headline">
          무언가를<br />
          요청하고 싶다면<br />
          <a href="mailto:hello@lazydesk.studio">hello@lazydesk.studio</a>
        </h2>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="ld-footer">
      <div className="shell footer-inner">
        <span>© 2026 레이지데스크 스튜디오(Lazydesk Studio) · 사업자등록번호 564-24-02094</span>
        <span className="footer-social">
          <a href="https://www.instagram.com/lazydesk.studio" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/lazydesk-studio" target="_blank" rel="noopener noreferrer">GitHub</a>
        </span>
      </div>
    </footer>
  )
}

export default function Home() {
  const [works, setWorks] = useState<Work[]>([])
  const [writings, setWritings] = useState<Writing[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: worksData }, { data: writingsData }] = await Promise.all([
        supabase
          .from('works')
          .select('id, title, description, kind, year, icon_url, screenshot_url, external_url, order_index')
          .eq('is_published', true)
          .order('order_index', { ascending: true }),
        supabase
          .from('writing')
          .select('id, title, excerpt, slug, date')
          .eq('is_published', true)
          .order('date', { ascending: false }),
      ])
      setWorks(worksData ?? [])
      setWritings(writingsData ?? [])
    }
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Lazydesk Studio</title>
        <meta name="description" content="게으름이 허락된 책상에서 시작된 1인 창작 스튜디오. 기획·디자인·개발." />
        <meta property="og:title" content="Lazydesk Studio" />
        <meta property="og:description" content="게으름이 허락된 책상에서 시작된 웹/앱 서비스 제작 스튜디오" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://lazydesk.studio" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Nav />
      <main>
        <Hero />
        <About />
        <Works works={works} />
        <WritingSection writings={writings} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
