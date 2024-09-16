import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import ScopeLimit from '@/containers/scope-limit/ScopeLimit'

interface ScopeLimitPageProps {}

const ScopeLimitPage: React.FC<ScopeLimitPageProps> = () => {
  return (
    <MainLayout>
      <ScopeLimit />
    </MainLayout>
  )
}

export default ScopeLimitPage
