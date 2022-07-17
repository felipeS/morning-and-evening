import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script defer data-domain="xn--maanaynoche-2db.com" src="https://plausible.io/js/plausible.js"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300;1,700&display=swap" rel="stylesheet" />
        </Head>
        <body className='text-stone-800'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
