import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Routes } from 'react-router-dom'
import LoadingContent from './components/LoadingContent'
import { selectAuthorization } from './reducers'
import {
  ADMIN_ROUTE,
  authRoute,
  AUTH_ROUTE,
  DASHBOARD_ROUTE,
  mainRoute,
  MAIN_ROUTE,
  privateRoute,
  TEACHER_ROUTE,
} from './routes'

function App() {
  const { isLoading } = useSelector(selectAuthorization)

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingContent.PageLoading />}>
        <Routes>
          {mainRoute(MAIN_ROUTE)}
          {authRoute(AUTH_ROUTE)}
          {privateRoute(ADMIN_ROUTE)}
          {privateRoute(TEACHER_ROUTE)}
          {/* Dashboard routes */}
          {privateRoute(DASHBOARD_ROUTE)}
          
        </Routes>
      </Suspense>

      <LoadingContent.LoadingBackdrop isLoading={isLoading} />
    </React.Fragment>
  )
}

export default App
