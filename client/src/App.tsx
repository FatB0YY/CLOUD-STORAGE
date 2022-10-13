import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { checkAuth } from './redux/reducers/ActionCreators'
import Cookies from 'js-cookie'
import './App.scss'
import MainRoutes from './Routes'

function App() {
  const dispatch = useAppDispatch()
  const {isAuth, registrationAccess} = useAppSelector((store) => store.userReducer)


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch, registrationAccess, isAuth])
    
  return <MainRoutes />
}

export default App

// rafce
