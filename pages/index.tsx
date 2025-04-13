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
      <h2 className="mt-6 pl-4 mb-6 text-lg font-bold text-gray-900">
        Projects
      </h2>
      <div className="mb-4 p-4 grid gap-4 sm:grid-cols-2">
        {projects.slice(0, visibleProjects).map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border-none rounded-lg"
          >
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-white flex items-center justify-center">
                {/* 이미지 자리 대체용 - 임시 아이콘이나 텍스트 */}
                <span className="text-gray-400 text-sm">Image Placeholder</span>
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-base font-medium text-gray-900">
                  {project.title}
                </h3>
                <p className="mb-2 text-xs text-gray-500">
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
        <div className="mb-16 flex justify-center">
          <Button
            onClick={() => setVisibleProjects(projects.length)}
            className="text-xs text-gray-500 hover:text-gray-800 bg-transparent hover:bg-gray-100"
          >
            View more projects <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="mb-16" /> // 버튼 대신 빈 마진 블럭
      )}

      <h2 className="mt-6 mb-6 pl-4 text-lg font-bold text-gray-900">
        Updates
      </h2>
      <div className="mb-4 space-y-1">
        {articles.slice(0, visibleUpdates).map((article) => (
          <div key={article.id} className="group">
            <Link
              href={`/updates/${article.slug}`}
              className="block p-4 rounded-md hover:bg-gray-100 transition-colors"
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
