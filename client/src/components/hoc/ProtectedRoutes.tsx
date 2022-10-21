import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { checkAuth } from '../../redux/reducers/ActionCreators'

const ProtectedRoutes = (props: any) => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector((store) => store.userReducer)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
