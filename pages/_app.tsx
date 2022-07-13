import { DefaultSeo } from 'next-seo';
import App, { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router';
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = (`https://mañanaynoche.com` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];
  return (
    <>
      <DefaultSeo canonical={canonicalUrl} />
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location: '/' })
    appContext.ctx.res.end()
    return
  }

  return { ...appProps }
}