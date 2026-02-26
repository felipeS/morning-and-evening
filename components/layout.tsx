import Alert from './alert'
import Container from './container'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
        <Container>
          <Header />
        </Container>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
