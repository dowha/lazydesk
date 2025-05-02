// components/layout/Layout.tsx
'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Github, Instagram } from 'lucide-react'
import Image from 'next/image'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isDetailPage = pathname?.startsWith('/updates/')

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* 로고 + 소개 */}
      <header className="mb-12 text-center">
        <div className="relative flex items-center justify-center mb-4">
          {/* 글씨 - 로고 위에 겹치게 */}
          {!isDetailPage && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-2xl text-white beanie">Lazydesk Studio</h1>
            </div>
          )}

          {/* 로고 */}
          <Image
            src={
              isDetailPage ? '/lazydesk-logo-small.png' : '/lazydesk-logo.png'
            }
            alt="Lazydesk Studio Logo"
            width={isDetailPage ? 80 : 180}
            height={isDetailPage ? 54 : 123}
            priority
          />
        </div>
      </header>

      {children}

      <div className={`h-px w-full bg-gray-200 mt-12 mb-4`} role="separator" />

      {/* footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xs text-gray-400 text-center sm:text-left">
          <p>사업자등록번호: 564-24-02094</p>
          <p>
            © {new Date().getFullYear()} 레이지데스크 스튜디오(Lazydesk Studio)
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/lazydesk.studio"
            className="text-gray-400 hover:text-gray-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://github.com/lazydesk-studio"
            className="text-gray-400 hover:text-gray-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
