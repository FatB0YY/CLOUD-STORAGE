import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './components/hoc/ProtectedRoutes'
import LoginForm from './components/loginForm/LoginForm'
import RegistrationForm from './components/registrationForm/RegistrationForm'
import NotFoundPage from './components/notfound/404'
import Disk from './components/disk/Disk'
import ProfileScreen from './components/profileScreen/ProfileScreen'
import Nav from './components/navbar/Nav'

const MainRoutes = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/' element={<Navigate replace to='disk' />} />
          <Route path='/disk' element={<Disk />} />
        </Route>

        <Route path='/login' element={<LoginForm />} />
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='*' element={<NotFoundPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/userProfile' element={<ProfileScreen />} />
        </Route>
      </Routes>
    </>
  )
}

export default MainRoutes
