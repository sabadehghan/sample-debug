import { getServices } from '@/services/servicesServices'
import { useQuery } from '@tanstack/react-query'

const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })
}

export default useServices
