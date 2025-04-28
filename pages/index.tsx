'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'
import { Separator } from '@/components/ui/separator'

interface Project {
  id: string
  title: string
  summary: string
  external_url: string
  github_url?: string
  thumbnail_url?: string
  created_at?: string
}

interface Update {
  id: string
  title: string
  summary: string
  content: string
  thumbnail_url?: string
  created_at: string
  slug: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [articles, setArticles] = useState<Update[]>([])
  const [visibleProjects, setVisibleProjects] = useState(4)
  const [visibleUpdates, setVisibleUpdates] = useState(3)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: projectsData } = await supabase.from('projects').select('*')
      const { data: updatesData } = await supabase.from('updates').select('*')

      setProjects(projectsData || [])
      setArticles(updatesData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Layout>
        <h2 className="mb-6 text-2xl text-gray-900 text-center beanie ">
           Studio Story
        </h2>
        <Separator className="mb-4" />
       <p className="mt-6 px-4 mb-6 text-md text-gray-800">
         현대 사회에서 책상은 대체로 생산성의 상징처럼 여겨졌습니다. 그래선지
         앉는 순간 무언가 해야 할 것 같고, 아무것도 하지 않으면 왠지 뒤처지는
         느낌이 들어요. 하지만 우리는 그 책상 위에서 자주 할 일을 미루고, 멍을
         때리고, 괜히 책상 정리를 하기도 합니다. 그리고 사실은 그 느긋한 시간
         속에서 진짜 아이디어가 떠오릅니다.
       </p>
       <p className="mt-6 px-4 mb-6 text-md text-gray-800">
         <strong>레이지데스크 스튜디오(Lazydesk Studio)</strong>는 그런 게으름이
         허락된 책상에서 시작된 1인 창작 스튜디오입니다. 기획, 디자인, 개발까지
         모든 과정을 스스로 만들어가며, 누군가에게 필요하고 실용적인 (웹과 앱)
         서비스를 만듭니다. 빠르지 않아도 괜찮다는 믿음으로, 천천히 그러나 꾸준히
         나아갑니다. 부지런한 새들이 서둘러서 먼저 벌레를 잡아도 괜찮아요. 저는
         느긋하게 저만의 속도로 무언가를 만들고 있으니까요.{' '}
         <i>책상 앞에 앉은 채로.</i>
       </p>
      {/* Updates 섹션 */}
      <div className="relative w-[95%] mx-auto rounded-xl bg-white px-4 py-6 mt-12 mb-02">
        <h2 className="mb-6 text-2xl text-gray-900 text-center beanie ">
          Recent Notes
        </h2>
        <Separator className="mb-4" />

        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            등록된 소식이 없습니다.
          </p>
        ) : (
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
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {article.summary}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {visibleUpdates < articles.length && (
          <div className="mb-16 flex justify-center">
            <Button
              onClick={() => setVisibleUpdates(articles.length)}
              className="text-xs text-gray-500 hover:text-gray-800 bg-transparent hover:bg-gray-100"
            >
              View more updates <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      {/* Projects 섹션 */}
      <div className="relative w-[95%] mx-auto rounded-xl bg-[#D16A40] px-4 py-6 mt-12 mb-8">
        <h2 className="mb-6 text-2xl text-white text-center beanie">
          Projects
        </h2>

        {loading ? (
          <p className="text-center text-white text-sm">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-white text-sm">
            등록된 프로젝트가 없습니다.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, visibleProjects).map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden border-none rounded-lg"
              >
                <CardContent className="p-0 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
                    {project.thumbnail_url ? (
                      <Image
                        src={project.thumbnail_url}
                        alt={project.title}
                        width={640}
                        height={360}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Image Placeholder
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="mb-1 text-base font-medium text-gray-900">
                      {project.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.external_url && (
                        <a
                          href={project.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-medium text-gray-800 hover:underline"
                        >
                          View <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline"
                        >
                          GitHub <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {visibleProjects < projects.length && (
          <div className="mb-2 flex justify-center">
            <Button
              onClick={() => setVisibleProjects(projects.length)}
              className="mt-4 text-xs text-white hover:text-gray-800 bg-transparent hover:bg-gray-100"
            >
              View more projects <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}

        {/* 책상다리: Projects 섹션 하단에 추가 */}
        <div className="absolute -bottom-6 left-6 w-4 h-6 bg-[#9e4f24] hidden sm:block" />
        <div className="absolute -bottom-6 right-6 w-4 h-6 bg-[#9e4f24] hidden sm:block" />
      </div>
    </Layout>
  )
}
