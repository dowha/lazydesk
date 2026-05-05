import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Update {
  id: string
  title: string
  summary: string
  content: string
  created_at: string
  slug: string
}

interface UpdatePreview {
  id: string
  title: string
  summary: string
  created_at: string
  slug: string
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function Nav() {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <Link href="/" className="brand">
          <Image
            src="/lazydesk-logo-small.png"
            alt="Lazydesk Studio"
            width={240}
            height={164}
            className="brand-logo"
            priority
          />
          <span className="brand-name">Lazydesk<em>.</em>Studio</span>
        </Link>
        <nav className="nav-links">
          <Link href="/#works">Works</Link>
          <Link href="/#about">About</Link>
          <Link href="/#writing">Writing</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
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

export default function WritingDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  const [post, setPost] = useState<Update | null>(null)
  const [next, setNext] = useState<UpdatePreview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof slug !== 'string') return

    const fetchPost = async () => {
      const { data: postData } = await supabase
        .from('updates')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!postData) {
        setPost(null)
        setLoading(false)
        return
      }

      setPost(postData)

      const { data: nextData } = await supabase
        .from('updates')
        .select('id, title, summary, created_at, slug')
        .gt('created_at', postData.created_at)
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

      setNext(nextData ?? null)
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <>
        <Nav />
        <section className="writing-hero">
          <div className="shell">
            <p style={{ color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Loading…</p>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Head><title>Not found — Lazydesk Studio</title></Head>
        <Nav />
        <section className="writing-hero">
          <div className="shell">
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 500, letterSpacing: '-.025em' }}>
              글을 찾을 수 없습니다.
            </h1>
            <p className="lede" style={{ marginTop: 24 }}>
              <Link href="/" style={{ borderBottom: '1px solid var(--accent)', color: 'var(--accent)' }}>← 홈으로</Link>
            </p>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} — Lazydesk Studio</title>
        <meta name="description" content={post.summary} />
      </Head>

      <Nav />

      <section className="writing-hero">
        <div className="shell">
          <h1>{post.title}</h1>
          {post.summary && <p className="lede">{post.summary}</p>}
          <div className="meta-row">
            <div>
              <span className="k">Date</span>
              <span className="v">{formatDate(post.created_at)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="writing-body">
        <div className="shell">
          <div
            className="prose-ld"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {next && (
        <section className="next-writing">
          <div className="shell">
            <Link href={`/updates/${next.slug}`}>
              <div>
                <div className="label">Next</div>
                <div className="title">{next.title} →</div>
              </div>
              <span className="arrow">{formatDate(next.created_at)}</span>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
