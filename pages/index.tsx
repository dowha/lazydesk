'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Layout from '@/components/Layout'
import { mockProjects, mockArticles } from '@/lib/mock'

export default function Home() {
  const [visibleProjects, setVisibleProjects] = useState(4)
  const [visibleUpdates, setVisibleUpdates] = useState(3)

  const projects = mockProjects
  const articles = mockArticles

  return (
    <Layout>
      <p className="mt-6 px-4 mb-6 text-md text-gray-800">
        현대 사회에서 책상은 대체로 생산성의 상징처럼 여겨졌습니다. 앉는 순간
        무언가 해야 할 것 같고, 아무것도 하지 않으면 왠지 뒤처지는 느낌이 들죠.
        하지만 사실 우리는 그 책상 위에서 자주 멍을 때리고, 할 일을 미루고, 괜히
        정리만 하기도 해요. 그 느긋한 시간들 속에서 진짜 내 생각이 떠오르곤
        하죠.
      </p>
      <p className="mt-6 px-4 mb-6 text-md text-gray-800">
        <strong>Lazydesk Studio</strong>는 그런 게으름이 허락된 책상에서 시작된
        1인 창작 스튜디오입니다. 기획, 디자인, 개발까지 모든 과정을 스스로
        만들어가며, 필요하고 실용적인 웹과 앱 서비스를 만듭니다. 빠르지 않아도
        괜찮다는 믿음으로, 천천히 그러나 꾸준히 나아갑니다. 부지런한 새들이 먼저
        벌레를 잡아도 괜찮아요. 저는 느긋한 책상 위에서, 제 속도로 만들고
        있으니까요.
      </p>

      <div className="relative w-[95%] mx-auto rounded-xl bg-[#D16A40] px-4 py-6 mb-8">
        <div className="absolute -bottom-6 left-6 w-4 h-6 bg-[#9e4f24] hidden sm:block" />
        <div className="absolute -bottom-6 right-6 w-4 h-6 bg-[#9e4f24] hidden sm:block" />

        <h2 className="mb-6 text-lg font-bold text-white text-center">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.slice(0, visibleProjects).map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border-none rounded-lg"
            >
              <CardContent className="p-0 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    Image Placeholder
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-base font-medium text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-500">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-xs font-medium text-gray-800 hover:underline"
                  >
                    View <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {visibleProjects < projects.length ? (
          <div className="mb-2 flex justify-center">
            <Button
              onClick={() => setVisibleProjects(projects.length)}
              className="mt-4 text-xs text-white hover:text-gray-800 bg-transparent hover:bg-gray-100"
            >
              View more projects <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="mb-2" /> // 버튼 대신 빈 마진 블럭
        )}
      </div>

      <h2 className="mt-14 mb-6 pl-4 text-lg font-bold text-gray-900">
        Updates
      </h2>
      <div className="mb-4 space-y-1">
        {articles.slice(0, visibleUpdates).map((article) => (
          <div key={article.id} className="group">
            <Link
              href={`/updates/${article.slug}`}
              className="block p-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">{article.date}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {article.description}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {visibleUpdates < articles.length ? (
        <div className="mb-16 flex justify-center">
          <Button
            onClick={() => setVisibleUpdates(articles.length)}
            className="text-xs text-gray-500 hover:text-gray-800 bg-transparent hover:bg-gray-100"
          >
            View more updates <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="mb-16" />
      )}

      <div className="mb-12 text-center">
        <p className="mb-4 text-sm text-gray-500">
          Interested in working together?
        </p>
        <a href="mailto:hello@lazydesk.studio">
          <Button className="bg-black hover:bg-neutral-800 text-white text-sm px-4 py-2">
            hello@lazydesk.studio
          </Button>
        </a>
      </div>
    </Layout>
  )
}
