import { http } from './httpService'

export type LoginRequestType = {
  username: string
  password: string
}

export type LoginResponseType = {
  result: {
    token: string
  }
}

export const login = async (data: LoginRequestType): Promise<LoginResponseType> => {
  const response = await http.post('/admin/auth/login', data)
  console.log(response.data)
  return response.data
}
