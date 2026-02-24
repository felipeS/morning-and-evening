import { useState, useEffect } from 'react'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { PostType } from '../interfaces/post'

type Props = {
  allPosts: PostType[]
}

export default function Index({ allPosts }: Props) {
  const [heroPost, setHeroPost] = useState<PostType | null>(allPosts[0])
  const [isToday, setIsToday] = useState(false)

  useEffect(() => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    const isAm = now.getHours() < 12
    const suffix = isAm ? 'AM' : 'PM'

    // Try to find exact match: DD-MM-AM/PM
    let slug = `${day}-${month}-${suffix}`
    let found = allPosts.find((post) => post.slug === slug)

    if (!found) {
      // Try opposite time of day for same date
      const oppositeSuffix = isAm ? 'PM' : 'AM'
      slug = `${day}-${month}-${oppositeSuffix}`
      found = allPosts.find((post) => post.slug === slug)
    }

    if (found) {
      setHeroPost(found)
      setIsToday(true)
    }
  }, [allPosts])

  const morePosts = heroPost ? allPosts.filter((post) => post.slug !== heroPost.slug) : allPosts

  return (
    <>
      <Layout>
        <Head>
          <title>Mañana y Noche por Charles Spurgeon</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <>
              {isToday && (
                <h2 className="mb-4 text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-gray-500">
                  Lectura de Hoy
                </h2>
              )}
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            </>
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
