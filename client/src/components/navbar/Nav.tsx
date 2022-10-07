import { FC } from 'react'
import { Link } from 'react-router-dom'
import Cloudstoragelogo from '../../assets/img/cloudstorage-logo.png'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { logout } from '../../redux/reducers/ActionCreators'
import './navbar.scss'

const Nav: FC = () => {
  const { user } = useAppSelector((store) => store.userReducer)
  const dispatch = useAppDispatch()

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
        <Link
          onClick={() => dispatch(logout())}
          to={'/'}
          className='navbar__registration'
        >
          Выйти
        </Link>
      </div>
    </div>
  )
}

export default Nav
