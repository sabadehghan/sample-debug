import React, { ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

interface RtlProviderProps {
  children: ReactNode
}

const RtlProvider: React.FC<RtlProviderProps> = ({ children }) => (
  <CacheProvider value={cacheRtl}>
    {children}
  </CacheProvider>
)

export default RtlProvider
