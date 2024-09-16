import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

// Pages
const LoginPage = lazy(() => import('@/pages/auth/login'))
const DocsPage = lazy(() => import('@/pages/docs'))
const DocumentPage = lazy(() => import('@/pages/docs/[docsName]'))
const AccessPage = lazy(() => import('@/pages/access'))
const ReportsPage = lazy(() => import('@/pages/reports'))
import NotFoundPage from '@/pages/not-found'
import ProtectedRoute from './ProtectedRoute'
import PrivateRoute from './PrivateRoute'

const ROUTE_LIST = [
  {
    name: 'login',
    path: '/auth/login',
    component: () => (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    name: 'docs',
    path: '/docs',
    component: () => (
      <PrivateRoute>
        <DocsPage />
      </PrivateRoute>
    ),
  },
  {
    name: 'docs',
    path: '/docs/:docsName',
    component: () => (
      <PrivateRoute>
        <DocumentPage />
      </PrivateRoute>
    ),
  },
  {
    name: 'access',
    path: '/access',
    component: () => (
      <PrivateRoute>
        <AccessPage />
      </PrivateRoute>
    ),
  },
  {
    name: 'reports',
    path: '/reports',
    component: () => (
      <PrivateRoute>
        <ReportsPage />
      </PrivateRoute>
    ),
  },
]

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        }>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          {ROUTE_LIST.map((route) => (
            <Route key={route.name} path={route.path} element={<route.component />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
