import { FC } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Nav from './navbar/Nav'
import { useAppSelector } from '../hooks/redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout: FC = () => {
  const { isAuth } = useAppSelector((store) => store.userReducer)

  return (
    <>
      {isAuth ? <Nav /> : null}

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Same as */}
      <ToastContainer />

      <Outlet />
    </>
  )
}

export default Layout
