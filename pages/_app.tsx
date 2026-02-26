import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { ThemeProvider } from '../components/theme-provider'
import '../styles/index.css'
import '../styles/RefTagger.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = (`https://mañanaynoche.com` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];
  return (
    <ThemeProvider>
      <DefaultSeo canonical={canonicalUrl} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
