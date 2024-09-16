import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import Access from '@/containers/access/Access'

interface AccessPageProps {}

const AccessPage: React.FC<AccessPageProps> = () => {
  return (
    <MainLayout>
      <Access />
    </MainLayout>
  )
}

export default AccessPage
