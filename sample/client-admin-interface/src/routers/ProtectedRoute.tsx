import React, { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('token')
  const location = useLocation()

  return !accessToken ? <>{children}</> : <Navigate to="/docs" state={{ from: location.pathname }} replace />
}

export default ProtectedRoute
