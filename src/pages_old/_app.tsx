import '../styles/globals.css'
import '../styles/fonts.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Script from 'next/script'
import { env } from '../env/client.mjs'

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
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
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
