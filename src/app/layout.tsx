import '../styles/globals.css'
import Script from 'next/script'
import { env } from '../env.mjs'
import { Header } from '../layout/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      ></Script>
      <Script id="init-ga">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}
      </Script>
      <body>
        <div className="grid min-h-screen grid-rows-[80px_1fr_180px] bg-background">
          <Header />
          {children}
          <footer className="container mx-auto flex h-full flex-col items-center justify-between gap-4 py-10 font-display text-lg text-tertiary-2 lg:flex-row">
            <div className="flex items-center gap-4 lg:flex-col">
              <div className="font-medium">Cameron Burrows</div>
            </div>
            <div>
              Copyright &copy; Cameron Burrows {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
