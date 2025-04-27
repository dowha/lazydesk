'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { supabase } from '@/lib/supabase'

interface Update {
  id: string
  title: string
  summary: string
  content: string
  thumbnail_url?: string
  created_at: string
  slug: string
}

export default function UpdatePostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<Update | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof slug !== 'string') return

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        setPost(null)
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-gray-500 mt-12">Loading...</p>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Post not found
          </h2>
          <p className="text-sm text-gray-500">
            The requested update could not be found.
          </p>
          <div className="mt-6">
            <Link href="/">
              <Button className="text-sm text-gray-500 hover:text-gray-800 bg-transparent hover:bg-gray-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <header className="mb-8">
        <Link href="/">
          <Button className="text-sm text-gray-500 hover:text-gray-800 bg-transparent hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </Link>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 mt-4">
          {post.title}
        </h2>
        {post.created_at && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        )}
      </header>

      <article className="prose prose-sm prose-gray max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  )
}
