import { createScopeLimit, getScopeLimit, getScopeLimitDetail, updateScopeLimit } from '@/services/scopeLimitServices'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useScopeLimit = (scopeName?: string) => {
  const queryClient = useQueryClient()

  const scopeLimitQuery = useQuery({
    queryKey: ['scope-limit'],
    queryFn: getScopeLimit,
  })

  // Create scopeLimit
  const createScopeLimitMutation = useMutation({
    mutationFn: createScopeLimit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scope-limit'] })
    },
  })
  // Update scopeLimit
  const updateScopeLimitMutation = useMutation({
    mutationFn: updateScopeLimit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scope-limit'] })
    },
  })

  // Get scopeLimit detail by name
  const getScopeLimitDetailQuery = useQuery({
    queryKey: ['scope-limit', scopeName],
    queryFn: () => getScopeLimitDetail(scopeName || ''),
    enabled: !!scopeName,
  })

  return {
    scopeLimitQuery,
    createScopeLimitMutation,
    updateScopeLimitMutation,
    getScopeLimitDetailQuery,
  }
}

export default useScopeLimit
