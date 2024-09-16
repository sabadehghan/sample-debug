import { useQuery } from '@tanstack/react-query'
import { getServiceDetail, getServices } from '@/services/servicesServices'

const useServices = (serviceName?: string) => {
  const serviceQuery = useQuery({
    queryKey: ['service'],
    queryFn: getServices,
  })

  // Get access detail by name
  const serviceDetailQuery = useQuery({
    queryKey: ['service', serviceName],
    queryFn: () => getServiceDetail(serviceName || ''),
    enabled: !!serviceName,
  })

  return {
    serviceQuery,
    serviceDetailQuery,
  }
}

export default useServices
