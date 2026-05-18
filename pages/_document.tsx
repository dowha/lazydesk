import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          />
        </Head>
        <body>
          {/* lang 초기화 — 깜빡임 방지 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var l=localStorage.getItem('ldk-lang')||'ko';document.documentElement.lang=l;})();`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
