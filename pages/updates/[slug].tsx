import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'

const blogPosts: Record<
  string,
  { title: string; date: string; content: string }
> = {
  'launched-taskflow-2': {
    title: 'Launched TaskFlow 2.0 with improved performance',
    date: 'April 5, 2025',
    content: `
      <p>Today marks the release of TaskFlow 2.0, a major update...</p>
      <h2>Offline Support</h2>
      <p>Now works seamlessly offline using IndexedDB.</p>
    `,
  },
  'redesigning-designsystems-documentation': {
    title: 'Case study: Redesigning the DesignSystems documentation',
    date: 'March 22, 2025',
    content: `
      <p>In this case study, I’ll share how I redesigned the docs...</p>
    `,
  },
  'building-accessible-interfaces': {
    title: 'Building accessible interfaces by default',
    date: 'March 10, 2025',
    content: `
      <p>Accessibility should never be an afterthought.</p>
    `,
  },
}

export default function UpdatePostPage() {
  const router = useRouter()
  const { slug } = router.query
  if (typeof slug !== 'string') {
    return null // 또는 로딩 표시
  }

  const post = blogPosts[slug] ?? {
    title: 'Post not found',
    date: '',
    content: '<p>The requested update could not be found.</p>',
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
        {post.date && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            {post.date}
          </div>
        )}
      </header>

      <article className="prose prose-sm prose-gray max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  )
}
