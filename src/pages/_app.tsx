import '../styles/globals.css'
import '../styles/fonts.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
