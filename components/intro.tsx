import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-16 mb-24 md:mb-32">
      <div className="w-full text-center border-b-4 border-black pb-2 mb-2">
         <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter leading-none uppercase">
          Mañana y Noche
        </h1>
      </div>
      <div className="w-full flex justify-between items-center border-b border-black py-2 font-sans font-bold text-sm tracking-widest uppercase">
        <span>Charles H. Spurgeon</span>
        <span>Devocionales Diarios</span>
        <span>Est. 1866</span>
      </div>
    </section>
  )
}

export default Intro
