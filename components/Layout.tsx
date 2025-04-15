// components/layout/Layout.tsx
import { ReactNode } from 'react'
import { Zap, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* 로고 + 소개 */}
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-blue-600" />
          <h1 className="text-2xl font-medium text-gray-900">
            Lazydesk Studio
          </h1>
        </div>
        <p className="text-gray-500 max-w-xl mx-auto">
          현대 사회에서 책상은 대체로 생산성의 상징처럼 여겨졌습니다. 앉는 순간
          무언가 해야 할 것 같고, 아무것도 하지 않으면 왠지 뒤처지는 느낌이
          들죠. 하지만 사실 우리는 그 책상 위에서 자주 멍을 때리고, 할 일을
          미루고, 괜히 정리만 하기도 해요. 그 느긋한 시간들 속에서 진짜 내
          생각이 떠오르곤 하죠.
        </p>
        <p className="text-gray-500 max-w-xl mx-auto">
          Lazydesk Studio는 그런 _게으름이 허락된 책상_에서 시작된 1인 창작
          스튜디오입니다. 기획, 디자인, 개발까지 모든 과정을 스스로 만들어가며,
          필요하고 실용적인 웹과 앱 서비스를 만듭니다. 빠르지 않아도 괜찮다는
          믿음으로, 천천히 그러나 꾸준히 나아갑니다. 부지런한 새들이 먼저 벌레를
          잡아도 괜찮아요. 저는 느긋한 책상 위에서, 제 속도로 만들고 있으니까요.
        </p>
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
            href="#"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
