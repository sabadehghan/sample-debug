import { CssBaseline, ThemeProvider } from '@mui/material'
import RtlProvider from '@/themes/RtlProvider'
import { theme } from '@/themes/mui'
import AppRouter from './routers/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

export default App
