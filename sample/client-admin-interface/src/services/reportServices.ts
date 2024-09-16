import { http } from './httpService'

export type RecordsType = {
  resource: string
  client: string
  nid: string
  context: string
  timestamp: null
  message: string
  routingKey: string
  level: string
  type: string
}
export type ReportType = {
  context: string
  timestamp: string | null
  resource: string
  client: string
  nid: string
  status: string | null
  records: RecordsType[]
}

export const getReports = async () => {
  const { data } = await http.get('/admin/report')
  return data
}
