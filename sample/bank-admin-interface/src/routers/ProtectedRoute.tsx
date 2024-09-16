import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('token')
  const location = useLocation()

  return !accessToken ? <>{children}</> : <Navigate to="/companies" state={{ from: location.pathname }} replace />
}

export default ProtectedRoute
