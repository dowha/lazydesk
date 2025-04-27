// components/layout/Layout.tsx
'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Github, Instagram, Twitter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
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
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image
            src={
              isDetailPage ? '/lazydesk-logo-small.png' : '/lazydesk-logo.png'
            }
            alt="Lazydesk Studio Logo"
            width={isDetailPage ? 80 : 240}
            height={isDetailPage ? 54 : 123}
            priority
          />
        </div>
      </header>

      {children}

      <Separator className="mt-12 mb-4" />

      {/* footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xs text-gray-400 text-center sm:text-left">
          <p>사업자등록번호: 123-45-67890</p>
          <p>© {new Date().getFullYear()} Lazydesk Studio</p>
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://www.instagram.com/lazydesk.studio"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://github.com/lazydesk-studio"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
