import { http } from './httpService'

export type ServicesType = {
  name: string
  label: string
  method: string
  isTransactional: boolean
}

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getServices = async () => {
  const { data } = await http.get('/admin/resource')
  return data
}

export const getServiceDetail = async (name: string) => {
  const { data } = await http.get(`/admin/resource/${name}`)
  return data
}
