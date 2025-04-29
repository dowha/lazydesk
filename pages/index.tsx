'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import ProjectSelector from '@/components/ui/Project'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'

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
      <h2 className="mb-2 text-2xl text-gray-900 text-center beanie ">
        Studio Story
      </h2>
      <div
        className={`h-px w-4/5 mx-auto bg-gray-200 mt-12 mb-4`}
        role="separator"
      />

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
        느긋하게 저만의 속도로 무언가를 만들고 있으니까요. <i>책상 앞에서.</i>
      </p>
      {/* Updates 섹션 (Oxford 노트 스타일로) */}
      <div className="relative w-[95%] mx-auto rounded-lg bg-[#FFF9DB] px-0 pt-8 pb-6 mt-12 mb-8 overflow-hidden">
        {/* 파란색 상단 헤더 */}
        <div className="absolute top-0 left-0 w-full bg-[#003366] flex justify-center items-center px-4">
          <h2 className="text-2xl text-white text-center beanie">
            Recent Notes
          </h2>
        </div>

        <div className="mt-10 px-4 relative">
          {/* 전체 빨간 세로줄 두 개 */}
          <div className="absolute top-0 left-12 w-px h-full bg-red-300" />
          <div className="absolute top-0 left-14 w-px h-full bg-red-300" />

          {loading ? (
            <>
              <div className="flex justify-between items-center border-t border-blue-400  py-1">
                <p className="text-sm pl-12 text-gray-500">Loading...</p>
              </div>
              <div className="w-full border-b border-blue-400" />
              <div className="py-0.5">
                <span className="text-sm pl-12 font-semibold text-gray-900">
                  &nbsp;
                </span>
              </div>
              <div className="w-full border-b border-blue-400" />
            </>
          ) : articles.length === 0 ? (
            <>
              <div className="flex justify-between items-center border-t border-blue-400  py-1">
                <h3 className="text-md pl-12 font-semibold text-gray-900">
                  등록된 노트가 없습니다.
                </h3>
              </div>
              <div className="w-full border-b border-blue-400" />
              <div className="py-0.5">
                <span className="text-sm pl-12 font-semibold text-gray-900">
                  &nbsp;
                </span>
              </div>
              <div className="w-full border-b border-blue-400" />
            </>
          ) : (
            <>
              <div className="space-y-0">
                {articles.slice(0, visibleUpdates).map((article, idx) => (
                  <div
                    key={article.id}
                    className={`flex flex-col ${
                      idx === 0 ? 'border-t border-blue-400' : ''
                    }`}
                  >
                    <Link
                      href={`/updates/${article.slug}`}
                      className="flex flex-col flex-1 hover:bg-yellow-100"
                    >
                      {/* 제목 + 날짜 */}
                      <div className="flex justify-between items-center py-1">
                        <h3 className="truncate w-full text-md pl-12 font-semibold text-gray-900">
                          {article.title}
                        </h3>
                        <span className="hidden md:inline text-xs text-gray-400 mx-2">
                          {new Date(article.created_at)
                            .toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })
                            .replace(/\. /g, '.')
                            .replace('.', '.')}
                        </span>
                      </div>

                      {/* 제목 끝에 연한 파란 줄 */}
                      <div
                        className={`w-full border-b ${
                          article.summary
                            ? 'border-blue-200'
                            : 'border-blue-400'
                        }`}
                      />
                      {/* summary가 있을 때만 보여주기 */}
                      {article.summary && (
                        <>
                          <div className="flex items-center ">
                            <p className="truncate w-full text-md text-gray-700 py-1 pl-12 ">
                              <span className="text-sm">
                                {'—'} {article.summary}
                              </span>
                            </p>
                          </div>
                          {/* summary 끝에 진한 파란 줄 */}
                          <div className="w-full border-b border-blue-400" />
                        </>
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* 리스트 끝에만 빈 줄 + 진한 파란줄 */}
              <div className="py-0.5">
                <span className="text-sm pl-12 font-semibold text-gray-900">
                  &nbsp;
                </span>
              </div>
              <div className="w-full border-b border-blue-400" />
            </>
          )}

          {/* 더보기 버튼 */}
          {visibleUpdates < articles.length && (
            <div>
              <div className="flex justify-center order-b py-0.5">
                <Button
                  onClick={() => setVisibleUpdates(articles.length)}
                  className="py-1 text-xs text-gray-500 hover:text-gray-800 bg-transparent hover:bg-yellow-100"
                >
                  View more notes <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="w-full border-b border-blue-400" />
            </div>
          )}
        </div>
      </div>
      {/* Projects 섹션 */}

      <div className="relative w-[95%] mx-auto rounded-lg bg-[#F8F9FA] px-0 pt-8 pb-6 mt-12 mb-8 ">
        {/* 파란색 상단 헤더 */}
        <div className="absolute top-0 left-0 w-full rounded-t-lg bg-gray-700 flex justify-center items-center px-4">
          <h2 className="text-2xl text-white text-center beanie">Projects</h2>
        </div>
        {loading ? (
          <p className="text-sm mt-10 text-center text-gray-500">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            등록된 프로젝트가 없습니다.
          </p>
        ) : (
          <ProjectSelector projects={projects} />
        )}
      </div>
    </Layout>
  )
}
