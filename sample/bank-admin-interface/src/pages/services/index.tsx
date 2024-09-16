import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import Services from '@/containers/services/Services'

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = () => {
  return (
    <MainLayout>
      <Services />
    </MainLayout>
  )
}

export default DashboardPage
