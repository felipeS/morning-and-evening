import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import DailyReaderShell from '../../components/daily-reader-shell'
import { getAllPosts } from '../../lib/api'
import { buildReaderProps, ReaderProps, toReaderPosts } from '../../lib/daily-reader'

type Props = ReaderProps

type Params = {
  params: {
    slug: string
  }
}

export default function PostPage(props: Props) {
  const router = useRouter()

  if (!router.isFallback && !props.active?.title) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{`${props.active.title} | Mañana y Noche devocionales por Charles Spurgeon`}</title>
        <meta property="og:image" content="/assets/previewOg.png" />
      </Head>
      <DailyReaderShell {...props} />
    </>
  )
}

export async function getStaticProps({ params }: Params) {
  const allPosts = toReaderPosts(
    getAllPosts(['slug', 'title', 'date', 'excerpt', 'content', 'verses']) as Record<string, unknown>[]
  )

  return {
    props: await buildReaderProps(allPosts, params.slug),
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']) as Record<string, unknown>[]

  return {
    paths: posts.map((post) => ({
      params: {
        slug: String(post.slug),
      },
    })),
    fallback: false,
  }
}
