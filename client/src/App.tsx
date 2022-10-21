import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { checkAuth } from './redux/reducers/ActionCreators'
import Cookies from 'js-cookie'
import './App.scss'
import MainRoutes from './Routes'

function App() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])
    
  return <MainRoutes />
}

export default App

// rafce
