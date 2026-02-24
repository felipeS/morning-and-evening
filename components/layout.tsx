import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-[#fdfbf7] font-serif text-gray-900 selection:bg-black selection:text-white">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
