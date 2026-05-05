import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

/* ── 타입 ──────────────────────────────────── */

interface StudioContent {
  hero_lines: string[]
  hero_accent: string | null
  hero_subtitle: string | null
  about_body: string[]
  about_table: { k: string; v: string; type: 'text' | 'tags' }[]
  contact_message: string | null
  contact_email: string | null
}

interface Work {
  id: string
  title: string
  kind: string | null
  year: string | null
  icon_url: string | null
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

/* ── 유틸 ──────────────────────────────────── */

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

/* ── Nav ───────────────────────────────────── */

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
          <a href="#works" className="nav-primary">Works <span className="nav-arrow">↓</span></a>
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

/* ── Hero ──────────────────────────────────── */

function Hero({ content }: { content: StudioContent | null }) {
  const lines = content?.hero_lines ?? ['Small, slow,', 'honest app', 'made']
  const accent = content?.hero_accent ?? 'at a lazy desk.'
  const subtitle = content?.hero_subtitle ?? '게으름이 허락된 책상에서 시작된 1인 창작 스튜디오'
  const lastLine = lines[lines.length - 1]
  const prevLines = lines.slice(0, -1)

  return (
    <section className="hero" id="top">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/lazydesk-logo.png" alt="" className="hero-logo hero-logo--watermark" aria-hidden="true" />
      <div className="shell">
        <h1 className="h-display hero-headline">
          {prevLines.map((line, i) => (
            <span key={i} className="line">{line}</span>
          ))}
          <span className="line">
            {lastLine}{lastLine && accent ? ' ' : ''}<span className="accent">{accent}</span>
          </span>
        </h1>
        <div className="hero-foot">
          <div className="hero-tag body-l">{subtitle}</div>
        </div>
      </div>
    </section>
  )
}

/* ── About ─────────────────────────────────── */

function About({ content }: { content: StudioContent | null }) {
  const body = content?.about_body ?? []
  const table = content?.about_table ?? []

  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head">
          <h2 className="h-section">About</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            {body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="about-side">
            <div className="stack">
              {table.map((row, i) => (
                <div key={i} className="row">
                  <span className="k">{row.k}</span>
                  <span className="v">
                    {row.type === 'tags'
                      ? row.v.split(',').map((tag) => (
                          <span key={tag} className="tag">{tag.trim()}</span>
                        ))
                      : row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Works ─────────────────────────────────── */

function Works({ works }: { works: Work[] }) {
  return (
    <section className="section" id="works">
      <div className="shell">
        <div className="section-head">
          <h2 className="h-section">Works</h2>
        </div>
        <div className="works-list">
          {works.length === 0
            ? (
                <div className="row row-empty">
                  <span className="row-icon row-icon-empty" />
                  <span className="title" style={{ color: 'var(--ink-mute)' }}>—</span>
                  <span className="yr">—</span>
                  <span className="arrow" />
                </div>
              )
            : works.map((w) => (
                <a key={w.id} href={w.external_url ?? '#'} className="row" target="_blank" rel="noopener noreferrer">
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

/* ── Writing ───────────────────────────────── */

function WritingSection({ writings }: { writings: Writing[] }) {
  return (
    <section className="section" id="writing">
      <div className="shell">
        <div className="section-head">
          <h2 className="h-section">Writing</h2>
        </div>
        <div className="writing">
          {writings.length === 0
            ? (
                <div className="write-card write-card-empty">
                  <div className="write-meta"><span>—</span></div>
                  <h3 style={{ color: 'var(--ink-mute)' }}>Coming soon</h3>
                  <p style={{ color: 'var(--ink-mute)' }}>아직 쓰이지 않은 글.</p>
                  <span className="write-arrow" />
                </div>
              )
            : writings.map((n) => (
                <Link key={n.id} href={`/writing/${n.slug}`} className="write-card">
                  <div className="write-meta"><span>{formatDate(n.date)}</span></div>
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

/* ── Contact ───────────────────────────────── */

function Contact({ content }: { content: StudioContent | null }) {
  const message = content?.contact_message ?? '무언가를\n요청하고 싶다면'
  const email = content?.contact_email ?? 'hello@lazydesk.studio'
  const lines = message.split('\n')

  return (
    <section className="contact" id="contact">
      <div className="shell">
        <h2 className="contact-headline">
          {lines.map((line, i) => (
            <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
          ))}
          <br />
          <a href={`mailto:${email}`}>{email}</a>
        </h2>
      </div>
    </section>
  )
}

/* ── Footer ────────────────────────────────── */

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

/* ── Page ──────────────────────────────────── */

export default function Home() {
  const [studio, setStudio] = useState<StudioContent | null>(null)
  const [works, setWorks] = useState<Work[]>([])
  const [writings, setWritings] = useState<Writing[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [
        { data: studioData },
        { data: worksData },
        { data: writingsData },
      ] = await Promise.all([
        supabase
          .from('studio')
          .select('hero_lines, hero_accent, hero_subtitle, about_body, about_table, contact_message, contact_email')
          .limit(1)
          .single(),
        supabase
          .from('works')
          .select('id, title, kind, year, icon_url, external_url, order_index')
          .eq('is_published', true)
          .order('order_index', { ascending: true }),
        supabase
          .from('writing')
          .select('id, title, excerpt, slug, date')
          .eq('is_published', true)
          .order('date', { ascending: false }),
      ])

      if (studioData) setStudio(studioData as StudioContent)
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
        <Hero content={studio} />
        <About content={studio} />
        <Works works={works} />
        <WritingSection writings={writings} />
        <Contact content={studio} />
      </main>
      <Footer />
    </>
  )
}
