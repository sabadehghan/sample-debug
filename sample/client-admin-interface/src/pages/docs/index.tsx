import useServices from '@/hooks/useServices'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface DocsPageProps {}

const DocsPage: React.FC<DocsPageProps> = () => {
  const navigate = useNavigate()

  const { serviceQuery } = useServices()
  const { data: serviceData, isLoading } = serviceQuery
  if (!isLoading && serviceData) {
    navigate(serviceData.result.resources[0]?.name)
  }

  return null
}

export default DocsPage
