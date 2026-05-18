import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useRef, useCallback, ElementType, ComponentPropsWithoutRef } from 'react'
import { supabase } from '@/lib/supabase'

/* ── 타입 ──────────────────────────────────── */

interface WorkDetail {
  id: string
  slug: string
  title: string
  title_en: string | null
  summary: string | null
  summary_en: string | null
  year: string | null
  role: string | null
  stack: string | null
  status: string | null
  status_en: string | null
  external_url: string | null
  icon_url: string | null
  body: string | null
  body_en: string | null
  order_index: number
}

/* ── Fade-in ────────────────────────────────── */

function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); io.disconnect() } },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}

function FadeIn<T extends ElementType = 'div'>({
  as, children, className, ...props
}: { as?: T; children: React.ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  useFadeIn(ref)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag ref={ref as any} className={`fx${className ? ` ${className}` : ''}`} {...props}>{children}</Tag>
}

/* ── Lang toggle ────────────────────────────── */

function useLang() {
  const setLang = useCallback((l: 'ko' | 'en') => {
    document.documentElement.lang = l
    try { localStorage.setItem('ldk-lang', l) } catch (_) {}
  }, [])
  return { setLang }
}

/* ── Nav ───────────────────────────────────── */

function Nav() {
  const { setLang } = useLang()
  return (
    <FadeIn as="header" className="top">
      <Link className="brand" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lazydesk-logo.png" alt="Lazydesk Studio" />
      </Link>
      <nav className="top-nav" aria-label="primary">
        <Link href="/#about">About</Link>
        <Link href="/#works">Works</Link>
        <Link href="/#writing">Writing</Link>
        <Link href="/#contact">Contact</Link>
        <span className="lang" role="group" aria-label="language">
          <span data-l="ko" tabIndex={0} onClick={() => setLang('ko')} onKeyDown={(e) => e.key === 'Enter' && setLang('ko')}>KO</span>
          <span className="sep">/</span>
          <span data-l="en" tabIndex={0} onClick={() => setLang('en')} onKeyDown={(e) => e.key === 'Enter' && setLang('en')}>EN</span>
        </span>
      </nav>
    </FadeIn>
  )
}

/* ── Footer ─────────────────────────────────── */

function Footer() {
  return (
    <FadeIn as="footer" className="foot">
      <div>
        <span className="ko">© 2026 레이지데스크 스튜디오 · 사업자등록번호 564-24-02094</span>
        <span className="en">© 2026 Lazydesk Studio · Business reg. 564-24-02094</span>
      </div>
      <div className="links">
        <a className="lk" href="https://www.instagram.com/lazydesk.studio" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a className="lk" href="https://github.com/lazydesk-studio" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </FadeIn>
  )
}

/* ── Page ──────────────────────────────────── */

interface WorkPageProps {
  work: WorkDetail
  prev: { slug: string; title: string; title_en: string | null } | null
  next: { slug: string; title: string; title_en: string | null } | null
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase
    .from('works')
    .select('slug')
    .eq('is_published', true)
    .not('slug', 'is', null)

  return {
    paths: (data ?? []).map((w) => ({ params: { slug: w.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<WorkPageProps> = async ({ params }) => {
  const slug = params?.slug as string

  const { data: works } = await supabase
    .from('works')
    .select('id, slug, title, title_en, summary, summary_en, year, role, stack, status, status_en, external_url, icon_url, body, body_en, order_index')
    .eq('is_published', true)
    .not('slug', 'is', null)
    .order('order_index', { ascending: true })

  if (!works || works.length === 0) return { notFound: true }

  const idx = works.findIndex((w) => w.slug === slug)
  if (idx === -1) return { notFound: true }

  const work = works[idx] as WorkDetail
  const prev = idx > 0 ? { slug: works[idx - 1].slug, title: works[idx - 1].title, title_en: works[idx - 1].title_en ?? null } : null
  const next = idx < works.length - 1 ? { slug: works[idx + 1].slug, title: works[idx + 1].title, title_en: works[idx + 1].title_en ?? null } : null

  return { props: { work, prev, next }, revalidate: 60 }
}

export default function WorkPage({ work, prev, next }: WorkPageProps) {
  const pageTitle = `${work.title} — Lazydesk Studio`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={work.summary ?? work.title} />
      </Head>
      <div className="shell">
        <Nav />
        <main>
          <FadeIn as="a" className="back" href="/#works">← Works</FadeIn>

          <FadeIn as="header" className="article-head">
            <span className="eyebrow">Work · {work.year ?? '2026'}</span>
            <h1>
              <span className="ko">{work.title}</span>
              {work.title_en && <span className="en">{work.title_en}</span>}
            </h1>
            {(work.summary || work.summary_en) && (
              <p className="summary">
                {work.summary && <span className="ko">{work.summary}</span>}
                {work.summary_en && <span className="en">{work.summary_en}</span>}
              </p>
            )}
          </FadeIn>

          <FadeIn className="media wide">
            <span className="label">PRODUCT SHOT</span>
          </FadeIn>

          <FadeIn as="section" className="meta" aria-label="project meta">
            <dl>
              <dt>Year</dt>
              <dd className="tab">{work.year ?? '2026'}</dd>

              {work.role && (
                <><dt>Role</dt><dd>{work.role}</dd></>
              )}

              {work.stack && (
                <><dt>Stack</dt><dd>{work.stack}</dd></>
              )}

              {(work.status || work.status_en) && (
                <>
                  <dt>Status</dt>
                  <dd>
                    {work.status && <span className="ko">{work.status}</span>}
                    {work.status_en && <span className="en">{work.status_en}</span>}
                  </dd>
                </>
              )}

              {work.external_url && (
                <>
                  <dt>Link</dt>
                  <dd>
                    <a className="lk" href={work.external_url} target="_blank" rel="noopener noreferrer">
                      <span className="ko">사이트 방문 →</span>
                      <span className="en">Visit live →</span>
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </FadeIn>

          {(work.body || work.body_en) && (
            <FadeIn as="article" className="body">
              {work.body && <p className="ko" style={{ whiteSpace: 'pre-wrap' }}>{work.body}</p>}
              {work.body_en && <p className="en" style={{ whiteSpace: 'pre-wrap' }}>{work.body_en}</p>}
            </FadeIn>
          )}

          <FadeIn as="nav" className="article-foot" aria-label="project nav">
            {prev ? (
              <Link href={`/works/${prev.slug}`}>
                <span className="ko">← {prev.title}</span>
                <span className="en">← {prev.title_en ?? prev.title}</span>
              </Link>
            ) : (
              <Link href="/#works">← Works</Link>
            )}
            {next ? (
              <Link href={`/works/${next.slug}`}>
                <span className="ko">{next.title} →</span>
                <span className="en">{next.title_en ?? next.title} →</span>
              </Link>
            ) : (
              <Link href="/#works">Works →</Link>
            )}
          </FadeIn>
        </main>
        <Footer />
      </div>
    </>
  )
}
