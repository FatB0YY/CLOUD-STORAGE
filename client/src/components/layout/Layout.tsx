import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../navbar/Nav'
import './layout.scss'

const Layout: FC = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default Layout
