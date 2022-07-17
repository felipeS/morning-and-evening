import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
