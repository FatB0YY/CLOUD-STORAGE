import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const { isAuth } = useAppSelector((store) => store.userReducer)

  if (!isAuth) {
    return <Navigate to='/registration' state={{ from: location }} />
  }

  return children
}

export default RequireAuth
