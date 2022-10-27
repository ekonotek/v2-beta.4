import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "app/blitz-client"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import createEmotionCache from "app/core/utils/createEmotionCache"
import lightTheme from "app/core/styles/theme/lightTheme"
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <CacheProvider value={emotionCache}>
      {/* <ThemeProvider theme={lightTheme}> */}
      <CssBaseline />

      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
      {/* </ThemeProvider> */}
    </CacheProvider>
  )
}

export default withBlitz(MyApp)
