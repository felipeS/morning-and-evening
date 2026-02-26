const Intro = () => {
  return (
    <header className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-stone-200 mb-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          {/* Decorative cross / flourish */}
          <div className="text-amber-600 mb-4 text-2xl select-none" aria-hidden="true">✦</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight leading-tight text-stone-900">
            Mañana y Noche
          </h1>
          <p className="text-lg md:text-xl font-serif italic text-stone-500 mt-2">
            por Charles Spurgeon
          </p>
        </div>
        <p className="text-base md:text-lg text-stone-500 max-w-xs md:text-right leading-relaxed">
          Devocionales diarios para la mañana y la noche.
        </p>
      </div>
    </header>
  )
}

export default Intro
