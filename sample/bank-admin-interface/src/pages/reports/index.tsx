import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import Reports from '@/containers/reports/Reports'

interface ReportsPageProps {}

const ReportsPage: React.FC<ReportsPageProps> = () => {
  return (
    <MainLayout>
      <Reports />
    </MainLayout>
  )
}

export default ReportsPage
