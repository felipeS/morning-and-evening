import Head from 'next/head'
import DailyReaderShell from '../components/daily-reader-shell'
import { getAllPosts } from '../lib/api'
import { buildReaderProps, ReaderProps, toReaderPosts } from '../lib/daily-reader'

type Props = ReaderProps

export default function Index(props: Props) {
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
