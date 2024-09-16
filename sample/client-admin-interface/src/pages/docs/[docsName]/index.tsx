import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import Document from '@/containers/docs/Document'

interface DocumentPageProps { }

const DocumentPage: React.FC<DocumentPageProps> = () => {
    return (
        <MainLayout>
            <Document />
        </MainLayout>
    )
}

export default DocumentPage
