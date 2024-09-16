import { AccessType } from './accessServices'
import { http } from './httpService'

export type CompanyType = {
  id?: string
  name: string
  password?: string
  ip: string
  description?: string
  callbackUrl: string
  publicKey?: string
  apiKey: string
  scopes: AccessType[]
}

export type CompanyMutationType = {
  name: string
  username: string
  password: string
  callbackUrl: string
  ip: string
  scopes: { id: string }[]
  publicKey: string
  description: string
}

export const getCompanies = async () => {
  const { data } = await http.get('/admin/client')
  return data
}

export const createCompany = async (data: CompanyMutationType) => {
  const { data: company } = await http.post('/admin/client', data)
  return company
}

export const updateCompany = async (data: CompanyMutationType) => {
  const { data: updatedCompany } = await http.put(`/admin/client`, data)
  return updatedCompany
}

export const getCompanyDetail = async (name: string) => {
  const { data } = await http.get(`/admin/client/${name}`)
  return data
}
