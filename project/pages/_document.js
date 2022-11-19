import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className='scroll-smooth' style={{ scrollBehaviour: "smooth" }}>
      <Head />
      <body className='scroll-smooth'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
