import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'

const PrivateWrapper = () => {
  const user = useAppSelector(selectCurrentUser)
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default PrivateWrapper
