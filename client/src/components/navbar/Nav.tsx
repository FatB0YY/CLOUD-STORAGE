import Cookies from 'js-cookie'
import { FC, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Cloudstoragelogo from '../../assets/img/cloudstorage-logo.png'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { logout, checkAuth } from '../../redux/reducers/ActionCreators'
import './navbar.scss'

const Nav: FC = () => {
  const { user, isAuth } = useAppSelector((store) => store.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(checkAuth())
    }
  }, [isAuth])

  return (
    <div className='navbar'>
      <div className='container'>
        <img
          className='navbar__logo'
          src={Cloudstoragelogo}
          alt='CLOUD STORAGE'
        />
        <div className='navbar__header'>CLOUD STORAGE</div>

        <b>{user.email}</b>

        {!isAuth ? (
          <>
            <NavLink className='navbar__login' to={'/login'}>Войти</NavLink>
            <NavLink className='navbar__registration' to={'/registration'}>Создать аккаунт</NavLink>
          </>
        ) : (
          <>
            <Link
              onClick={() => dispatch(logout())}
              to={'/'}
              className='navbar__registration'
            >
              Выйти
            </Link>
            <NavLink to={'/userProfile'}>Аккаунт</NavLink>
            <NavLink to={'/disk'}>Диск</NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Nav
