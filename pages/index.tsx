import Head from 'next/head'
import { useEffect, useRef, useCallback, ElementType, ComponentPropsWithoutRef } from 'react'

/* ── Lang toggle hook ──────────────────────── */

function useLang() {
  const setLang = useCallback((l: 'ko' | 'en') => {
    document.documentElement.lang = l
    try { localStorage.setItem('ldk-lang', l) } catch (_) {}
  }, [])

  return { setLang }
}

/* ── Scroll fade-in hook ───────────────────── */

function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}

function FadeIn<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: { as?: T; children: React.ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  useFadeIn(ref)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag ref={ref as any} className={`fx${className ? ` ${className}` : ''}`} {...props}>{children}</Tag>
}

/* ── Nav ───────────────────────────────────── */

function Nav() {
  const { setLang } = useLang()
  return (
    <FadeIn as="header" className="top">
      <a className="brand" href="#top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lazydesk-logo.png" alt="Lazydesk Studio" />
      </a>
      <span className="lang" role="group" aria-label="language">
        <span data-l="ko" tabIndex={0} onClick={() => setLang('ko')} onKeyDown={(e) => e.key === 'Enter' && setLang('ko')}>KO</span>
        <span className="sep">/</span>
        <span data-l="en" tabIndex={0} onClick={() => setLang('en')} onKeyDown={(e) => e.key === 'Enter' && setLang('en')}>EN</span>
      </span>
    </FadeIn>
  )
}

/* ── Hero ──────────────────────────────────── */

function Hero() {
  return (
    <FadeIn as="section" className="hero" aria-label="intro" style={{ borderTop: 0 }}>
      <h1>
        <span className="ko">작지만 유용한 것들을<br />게으른 책상 앞에서 만듭니다.</span>
        <span className="en">Small but useful things,<br />made at a lazy desk.</span>
      </h1>
      <p className="sub">
        <span className="ko">게으름이 허락된 책상에서 시작된 1인 창작 스튜디오</span>
        <span className="en">A solo studio born at a desk where laziness is allowed</span>
      </p>
    </FadeIn>
  )
}

/* ── About ─────────────────────────────────── */

function About() {
  return (
    <FadeIn as="section" id="about" className="about">
      <span className="sec-label">About</span>

      <p className="ko">
        현대 사회에서 책상은 대체로 생산성의 상징처럼 여겨졌습니다. 그래선지 앉는 순간 무언가 해야 할 것 같고,
        아무것도 하지 않으면 왠지 뒤처지는 느낌이 들어요. 하지만 우리는 그 책상 위에서 자주 할 일을 미루고,
        멍을 때리고, 괜히 책상 정리를 하기도 합니다. 그리고 사실은 그 느긋한 시간 속에서 진짜 아이디어가 떠오릅니다.
      </p>
      <p className="en">
        In modern life the desk has come to symbolize productivity. The moment we sit down,
        we feel we ought to be doing something — and if we aren't, we somehow feel left behind.
        But on that same desk we often put things off, daydream, or tidy up just to avoid the real work.
        And the truth is: it&apos;s in those slow moments that real ideas tend to arrive.
      </p>

      <p className="ko">
        레이지데스크 스튜디오(Lazydesk Studio)는 그런 게으름이 허락된 책상에서 시작된 1인 창작 스튜디오입니다.
        기획, 디자인, 개발까지 모든 과정을 스스로 만들어가며, 누군가에게 필요하고 실용적인 (웹과 앱) 서비스를 만듭니다.
      </p>
      <p className="en">
        Lazydesk Studio is a solo creative practice born at a desk where laziness is allowed.
        Planning, design, and development — everything is built end-to-end, with a focus on
        small web and mobile services that are genuinely useful.
      </p>

      <p className="ko">
        빠르지 않아도 괜찮다는 믿음으로, 천천히 그러나 꾸준히 나아갑니다. 부지런한 새들이 서둘러서
        먼저 벌레를 잡아도 괜찮아요. 저는 느긋하게 저만의 속도로 무언가를 만들고 있으니까요. 책상 앞에서.
      </p>
      <p className="en">
        I move slowly but steadily, trusting that fast isn&apos;t the only way. Let the early birds
        catch their worms — I&apos;ll keep making things at my own pace. Right here, at the desk.
      </p>
    </FadeIn>
  )
}

/* ── Contact ───────────────────────────────── */

function Contact() {
  return (
    <FadeIn as="section" id="contact" className="contact">
      <span className="sec-label">Contact</span>
      <p className="invite">
        <span className="ko">무언가를 요청하고 싶다면<br /></span>
        <span className="en">If you&apos;d like to ask for something<br /></span>
        <a className="mail" href="mailto:hello@lazydesk.studio">hello@lazydesk.studio</a>
      </p>
    </FadeIn>
  )
}

/* ── Footer ────────────────────────────────── */

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

export default function Home() {
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
      <div className="shell">
        <Nav />
        <main>
          <Hero />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
