import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <script defer data-domain="xn--maanaynoche-2db.com" src="https://plausible.io/js/plausible.js"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body className='text-stone-800'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
