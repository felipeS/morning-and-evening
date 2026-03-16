import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import DailyReaderShell from '../components/daily-reader-shell'
import { getAllPosts } from '../lib/api'
import { buildReaderProps, getCurrentReadingSlug, ReaderProps, toReaderPosts } from '../lib/daily-reader'

type Props = ReaderProps

export default function Index(props: Props) {
  const router = useRouter()

  useEffect(() => {
    const slug = getCurrentReadingSlug(props.timeline, new Date())
    if (slug) {
      router.replace(`/posts/${slug}`)
    }
  }, [props.timeline, router])

  return (
    <>
      <Head>
        <title>Daily Reader - Devotional</title>
      </Head>
      <DailyReaderShell {...props} />
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = toReaderPosts(
    getAllPosts(['slug', 'title', 'date', 'excerpt', 'content', 'verses']) as Record<string, unknown>[]
  )

  return {
    props: await buildReaderProps(allPosts),
  }
}
