import Head from 'next/head'
import Container from "../components/container"
import HeroPost from "../components/hero-post"
import Layout from "../components/layout"
import MoreStories from '../components/more-stories'
import { PostType } from "../interfaces/post"
import { getAllPosts } from "../lib/api"

type Props = {
  allPosts: PostType[]
}

export default function Custom404({allPosts}: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Página no encontrada | Mañana y Noche por Charles Spurgeon</title>
        </Head>
        <Container>
          <div className="py-8 text-center">
            <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">Página no encontrada</h1>
            <p className="text-stone-600 dark:text-stone-300">Aquí tienes los devocionales más recientes:</p>
          </div>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}