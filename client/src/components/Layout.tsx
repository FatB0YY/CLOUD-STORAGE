import { FC } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Nav from './navbar/Nav'
import { useAppSelector } from '../hooks/redux'

const Layout: FC = () => {
  const { isAuth } = useAppSelector((store) => store.userReducer)

  return (
    <>
      {isAuth ? <Nav /> : null}

      <Outlet />
    </>
  )
}

export default Layout
