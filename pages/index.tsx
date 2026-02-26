import Container from '../components/container'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { PostType } from '../interfaces/post'
import Link from 'next/link'

type Props = {
  allPosts: PostType[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Layout>
        <Head>
          <title>Mañana y Noche | Charles Spurgeon</title>
          <meta name="description" content="Devocionales diarios para el día y la noche" />
        </Head>
        
        {/* Hero Section - Latest Post */}
        {heroPost && (
          <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
            
            <Container>
              <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Label */}
                <span className="inline-block px-4 py-1 mb-6 text-xs font-medium tracking-widest uppercase bg-stone-200/50 dark:bg-stone-700/50 text-stone-600 dark:text-stone-300 rounded-full">
                  Devocional más reciente
                </span>
                
                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-800 dark:text-stone-100 leading-tight mb-6">
                  {heroPost.title}
                </h1>
                
                {/* Excerpt/Verse */}
                <blockquote className="text-lg md:text-xl font-serif italic text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  "{heroPost.excerpt}"
                </blockquote>
                
                {/* Date & Read More */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-stone-500 dark:text-stone-400">
                  <time className="text-sm">
                    {new Date(heroPost.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                  <span className="hidden md:inline">·</span>
                  <Link 
                    href={`/posts/${heroPost.slug}`}
                    className="inline-flex items-center gap-2 text-stone-700 dark:text-stone-200 font-medium hover:gap-3 transition-all duration-200"
                  >
                    Leer devocional 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Container>
            
            {/* Decorative scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </section>
        )}
        
        {/* More Posts Section */}
        {morePosts.length > 0 && (
          <section className="py-20 bg-white dark:bg-stone-900">
            <Container>
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-12 text-center">
                  Devocionales anteriores
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {morePosts.map((post) => (
                    <article key={post.slug} className="group">
                      <Link href={`/posts/${post.slug}`} className="block">
                        <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300">
                          <time className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                            {new Date(post.date).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'short'
                            })}
                          </time>
                          <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-100 mt-3 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}
        
        {/* Footer Note */}
        <section className="py-16 bg-stone-100 dark:bg-stone-800">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-stone-600 dark:text-stone-300 font-serif italic">
                "Mañana y Noche" — Devocionales diarios adaptados de los sermones de Charles Spurgeon
              </p>
            </div>
          </Container>
        </section>
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
