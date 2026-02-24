import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-12 mb-16 md:mb-20 text-center border-b-2 border-gray-200 pb-8">
      <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-tight">
        Mañana y Noche
      </h1>
      <h3 className="text-lg md:text-xl font-serif italic mt-2 text-gray-600">
        Devocionales diarios por Charles Spurgeon
      </h3>
    </section>
  )
}

export default Intro
