import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCompany, getCompanies, getCompanyDetail, updateCompany } from '@/services/companiesServices'

const useCompanies = (companyName?: string) => {
  const queryClient = useQueryClient()

  const companiesQuery = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  // Create company
  const createCompanyMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })

  // Update company
  const updateCompanyMutation = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })

  // Get company detail by name
  const getCompanyDetailQuery = useQuery({
    queryKey: ['companies', companyName],
    queryFn: () => getCompanyDetail(companyName || ''),
    enabled: !!companyName,
  })

  return {
    companiesQuery,
    createCompanyMutation,
    updateCompanyMutation,
    getCompanyDetailQuery,
  }
}

export default useCompanies
