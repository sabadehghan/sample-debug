import { http } from './httpService'

export type ScopeLimitType = {
  id?: string
  name: string
  dailyAmount: number | null
  monthlyAmount: number | null
  perTransactionAmount: number | null
  dailyTransactionCount: number | null
  monthlyTransactionCount: number | null
}

export const getScopeLimit = async () => {
  const { data } = await http.get('/admin/scope-limit')
  return data
}

export const createScopeLimit = async (data: ScopeLimitType) => {
  const { data: scopeLimit } = await http.post('/admin/scope-limit', data)
  return scopeLimit
}

export const updateScopeLimit = async (data: ScopeLimitType) => {
  const { data: updatedScopeLimit } = await http.put(`/admin/scope-limit`, data)
  return updatedScopeLimit
}

export const getScopeLimitDetail = async (name: string) => {
  const { data } = await http.get(`/admin/scope-limit/${name}`)
  return data
}
