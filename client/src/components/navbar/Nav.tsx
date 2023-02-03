import { FC } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Cloudstoragelogo from '../../assets/img/cloudstorage-logo.png'
import { useAppSelector } from '../../hooks/redux'
import { useLogoutMutation } from '../../service/AuthAPI'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import './navbar.scss'

const Nav: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const [logout, {}] = useLogoutMutation()

  const handlerLogout = () => {
    logout()
  }
 
  return (
    <div className='navbar'>
      <div className='container'>
        <Link to={user ? '/disk' : '/'} className='navbar__linklogo'>
          <img
            className='navbar__logo'
            src={Cloudstoragelogo}
            alt='CLOUD STORAGE'
          />
          <div className='navbar__header'>CLOUD STORAGE</div>
        </Link>

        <b>{user?.email}</b>

        {!user ? (
          <>
            <NavLink className='navbar__login' to={'/login'}>
              Войти
            </NavLink>
            <NavLink className='navbar__registration' to={'/registration'}>
              Создать аккаунт
            </NavLink>
          </>
        ) : (
          <>
            <Link
              onClick={handlerLogout}
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
