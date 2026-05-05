import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function UpdatesRedirect() {
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (typeof slug === 'string') {
      router.replace(`/writing/${slug}`)
    }
  }, [slug, router])

  return null
}
