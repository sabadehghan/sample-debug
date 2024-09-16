import React, { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('token')
  const location = useLocation()

  return accessToken ? <>{children}</> : <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
}

export default PrivateRoute
