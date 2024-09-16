import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import Companies from '@/containers/companies/Companies'

interface CompaniesPageProps { }

const CompaniesPage: React.FC<CompaniesPageProps> = () => {
    return (
        <MainLayout>
            <Companies />
        </MainLayout>
    )
}

export default CompaniesPage
