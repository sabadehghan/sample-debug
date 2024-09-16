import { ServicesType } from './servicesServices'
import { http } from './httpService'

export type AccessType = {
  id: string
  name: string
  description: string
  services: ServicesType[]
  expireTimeByDay: number
  type: string
  scopeLimit: {
    id?: string
    name: string
    dailyAmount?: number
    monthlyAmount?: number
    perTransactionAmount?: number
    dailyTransactionCount?: number
    monthlyTransactionCount?: number
  }
}

export type AccessMutationType = {
  name: string
  services: string[]
  scopeLimit: {
    name: string
  }
  type: string
  description: string
  expireTimeByDay: number
}

export const getAccess = async () => {
  const { data } = await http.get('/admin/scope')
  return data
}

export const createAccess = async (data: AccessMutationType) => {
  const { data: access } = await http.post('/admin/scope', data)
  return access
}

export const updateAccess = async (data: AccessMutationType) => {
  const { data: access } = await http.put('/admin/scope', data)
  return access
}

export const getAccessDetail = async (name: string) => {
  const { data } = await http.get(`/admin/scope/${name}`)
  return data
}
