import axios from 'axios'

const config: { headers: { 'Content-Type': string; Authorization?: string } } = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const token = localStorage.getItem('token')
if (token) {
  config.headers.Authorization = `Bearer ${token}`
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: config.headers,
  transformRequest: function (data, headers) {
    if (token && headers) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const additionalInfo = localStorage.getItem('additional-info')
    if (additionalInfo) {
      const requestId = JSON.parse(additionalInfo).requestId
      if (requestId) {
        const body = { ...data, issueRequestId: requestId }
        return JSON.stringify(body)
      }
    }

    return JSON.stringify(data)
  },
})
