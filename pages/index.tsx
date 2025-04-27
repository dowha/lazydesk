'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react'
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
        <Separator className="mt-12 mb-4" />
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
