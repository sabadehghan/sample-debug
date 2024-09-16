import { getReports } from '@/services/reportServices'
import { useQuery } from '@tanstack/react-query'

const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  })
}

export default useReports
