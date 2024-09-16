// import { lazy, Suspense } from 'react'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import ProtectedRoute from './ProtectedRoute'
// import PrivateRoute from './PrivateRoute'
// import NotFoundPage from '@/pages/not-found'
// import { Backdrop, CircularProgress } from '@mui/material'

// // Lazy-loaded pages
// const LoginPage = lazy(() => import('@/pages/auth/login'))
// const CompaniesPage = lazy(() => import('@/pages/companies'))
// const ServicesPage = lazy(() => import('@/pages/services'))
// const AccessPage = lazy(() => import('@/pages/access'))
// const ReportsPage = lazy(() => import('@/pages/reports'))
// const ScopeLimitPage = lazy(() => import('@/pages/scope-limit'))

// const LoadingFallback = () => (
//   <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}>
//     <CircularProgress color="inherit" />
//   </Backdrop>
// )

// const router = createBrowserRouter([
//   {
//     path: '/auth/login',
//     element: (
//       <ProtectedRoute>
//         <LoginPage />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/companies',
//     element: (
//       <PrivateRoute>
//         <CompaniesPage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: '/services',
//     element: (
//       <PrivateRoute>
//         <ServicesPage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: '/access',
//     element: (
//       <PrivateRoute>
//         <AccessPage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: '/reports',
//     element: (
//       <PrivateRoute>
//         <ReportsPage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: '/scope-limit',
//     element: (
//       <PrivateRoute>
//         <ScopeLimitPage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: '*',
//     element: <NotFoundPage />,
//   },
// ])

// function AppRouter() {
//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <RouterProvider router={router} />
//     </Suspense>
//   )
// }

// export default AppRouter

import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
const LoginPage = lazy(() => import('@/pages/auth/login'))
const CompaniesPage = lazy(() => import('@/pages/companies'))
const ServicesPage = lazy(() => import('@/pages/services'))
const AccessPage = lazy(() => import('@/pages/access'))
const ReportsPage = lazy(() => import('@/pages/reports'))
const ScopeLimitPage = lazy(() => import('@/pages/scope-limit'))
import ProtectedRoute from './ProtectedRoute'
import PrivateRoute from './PrivateRoute'
import NotFoundPage from '@/pages/not-found'
import { Backdrop, CircularProgress } from '@mui/material'

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
    name: 'companies',
    path: '/companies',
    component: () => (
      <PrivateRoute>
        <CompaniesPage />
      </PrivateRoute>
    ),
  },
  {
    name: 'services',
    path: '/services',
    component: () => (
      <PrivateRoute>
        <ServicesPage />
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
  {
    name: 'scope-limit',
    path: '/scope-limit',
    component: () => (
      <PrivateRoute>
        <ScopeLimitPage />
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
