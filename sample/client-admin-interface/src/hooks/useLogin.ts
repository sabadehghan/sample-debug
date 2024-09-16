import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, LoginRequestType, LoginResponseType } from '@/services/loginService'

const useLogin = () => {
  const queryClient = useQueryClient()

  const loginAccess = useMutation<LoginResponseType, Error, LoginRequestType>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.result.token)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Login failed: ', error)
    },
  })

  return {
    loginAccess,
  }
}

export default useLogin
