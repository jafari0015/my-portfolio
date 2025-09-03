import "@/styles/globals.css";
import "@/styles/customs.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const siteUrl = "https://my-portfolio-tt98.vercel.app";
  const siteTitle = "Mahdi Jafari | Portfolio";
  const siteDescription =
    "Explore Mahdi Jafari’s projects, blogs, and journey as a web developer.";
  const siteImage = `${siteUrl}/profile_image/preview.jpg`; 

  return (
    <>
      <Head> 
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="Mahdi Jafari, portfolio, web developer, Next.js, React" />
        <meta name="author" content="Mahdi Jafari" />
        <link rel="canonical" href={siteUrl} />

       
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:image:alt" content="Mahdi Jafari Portfolio Preview" />

       
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:image:alt" content="Mahdi Jafari Portfolio Preview" />

       
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="background dark:bg-[#000000] bg-opacity-5 bg-[#fff] -z-10">
        <div className="px-4 md:px-4 xl:px-24 pt-20 sm:pt-0">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
