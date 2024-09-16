import { http } from './httpService'

export type ServicesType = {
  name: string
  method: string
  isTransactional: boolean
}

export const getServices = async () => {
  const { data } = await http.get('/admin/resource')
  return data
}
