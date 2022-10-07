import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { checkAuth } from './redux/reducers/ActionCreators'

import { Routes, Route, Navigate } from 'react-router-dom'
import NotFoundPage from './components/notfound/404'
import Layout from './components/Layout'
import RequireAuth from './components/hoc/RequireAuth'

import './App.scss'
import RegistrationForm from './components/registrationForm/RegistrationForm'
import LoginForm from './components/loginForm/LoginForm'
import Disk from './components/disk/Disk'

function App() {
  const dispatch = useAppDispatch()
  const { isAuth, user} = useAppSelector((store) => store.userReducer)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])


  console.log('isAuth', isAuth);
  console.log('user', user);
  
  

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/registration' element={<RegistrationForm />} />
        </>
      ) : null}

      <Route path='*' element={<NotFoundPage />} />

      <Route
        path='/disk'
        element={
          <RequireAuth>
            <Disk />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App

// rafce
