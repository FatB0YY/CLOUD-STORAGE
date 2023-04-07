import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateWrapper from './components/hoc/PrivateWrapper'
import Home from './components/home/Home'
import NotFoundPage from './components/notfound/404'
import Disk from './components/disk/Disk'
import Loader from './components/loader/Loader'
import ProfileScreen from './components/profileScreen/ProfileScreen'
import LoginForm from './components/authForm/LoginForm'
import RegistrationForm from './components/authForm/RegistrationForm'
import Layout from './components/layout/Layout'
import { authAPI } from './service/AuthAPI'
import Cookies from 'js-cookie'
import { TypesLoader } from './components/loader/Loader'
import './App.scss'

function App() {
  const [trigger, { isFetching, isLoading }] = authAPI.useLazyCheckAuthQuery()
  const token = Cookies.get('accessToken')

  useEffect(() => {
    async function checkAuth() {
      await trigger().unwrap()
    }

    if (token) {
      checkAuth()
    }
  }, [token])

  if (isLoading || isFetching) {
    return <Loader type={TypesLoader.MAIN} />
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='registration' element={<RegistrationForm />} />
        <Route path='*' element={<NotFoundPage />} />

        {/* private routes */}
        <Route element={<PrivateWrapper />}>
          <Route path='disk' element={<Disk />} />
          <Route path='userProfile' element={<ProfileScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
