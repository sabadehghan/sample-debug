import { createAccess, getAccess, getAccessDetail, updateAccess } from '@/services/accessServices'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useAccess = (accessName?: string) => {
  const queryClient = useQueryClient()

  const accessQuery = useQuery({
    queryKey: ['access'],
    queryFn: getAccess,
  })

  // Create access
  const createAccessMutation = useMutation({
    mutationFn: createAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access'] })
    },
  })

  // Update access
  const updateAccessMutation = useMutation({
    mutationFn: updateAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access'] })
    },
  })

  // Get access detail by name
  const getAccessDetailQuery = useQuery({
    queryKey: ['access', accessName],
    queryFn: () => getAccessDetail(accessName || ''),
    enabled: !!accessName,
  })

  return {
    accessQuery,
    createAccessMutation,
    updateAccessMutation,
    getAccessDetailQuery,
  }
}

export default useAccess
