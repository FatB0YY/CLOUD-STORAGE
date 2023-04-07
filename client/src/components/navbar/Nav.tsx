import { FC, useState, ChangeEvent, useEffect } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import Cloudstoragelogo from '../../assets/img/cloudstorage-logo.png'
import { useAppSelector } from '../../hooks/redux'
import { useLogoutMutation } from '../../service/AuthAPI'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import Headroom from 'react-headroom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './navbar.scss'
import { IFile, getExtensionIcon } from '../../models/response/IFile'
import { useDebounce } from '../../hooks/debounce'
import { filesAPI } from '../../service/FilesAPI'

const Nav: FC = () => {
  const [searchName, setSearchName] = useState<string>('')
  const debounced: string = useDebounce(searchName)
  const [searchFilesTrigger, { data: searchFiles }] =
    filesAPI.endpoints.searchFiles.useLazyQuery()

  const params: { [key: string]: string } = useParams()
  const current: string | undefined = params['*']
  const user = useAppSelector(selectCurrentUser)
  const [logout, {}] = useLogoutMutation()

  useEffect(() => {
    if (user) {
      searchFilesTrigger(debounced)
    }
  }, [debounced, searchFilesTrigger, user])

  const handlerLogout = () => {
    logout().unwrap()
  }

  function searchChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
  }

  function renderSearchFiles() {
    return searchFiles
      ? searchFiles.map((item: IFile) => {
          return (
            <div key={item._id} className='navbar-searchBlock__item'>
              <div className='navbar-searchBlock__icon'>
                <img
                  src={getExtensionIcon(item.type)}
                  alt={item.type}
                  className='navbar-searchBlock__iconImg'
                />
              </div>
              <div className='navbar-searchBlock__content'>
                <span className='navbar-searchBlock__text'>{item.name}</span>
              </div>
            </div>
          )
        })
      : null
  }

  const searchFilesList = renderSearchFiles()

  return (
    <Headroom disable={current ? true : false}>
      <div className={current === 'disk' ? 'navbar navbar-disk' : 'navbar'}>
        <div className='container'>
          <Link to={user ? '/disk' : '/'} className='navbar__linklogo'>
            <img
              className='navbar__logo'
              src={Cloudstoragelogo}
              alt='CLOUD STORAGE'
            />
            <div className='navbar__header'>CS</div>
          </Link>

          {!user ? (
            <div className='navbar__authbtns navbar__authbtns_home'>
              <NavLink className='navbar__login' to={'/login'}>
                Войти
              </NavLink>
              <NavLink className='navbar__registration' to={'/registration'}>
                Создать аккаунт
              </NavLink>
            </div>
          ) : (
            <div className='navbar__authbtns'>
              <div className='navbar__searchBlock navbar-searchBlock'>
                <form className='navbar-searchBlock__form'>
                  <input
                    value={searchName}
                    onChange={(e) => searchChangeHandler(e)}
                    className='navbar-searchBlock__searchInput'
                    placeholder='Название файла...'
                    type='text'
                  />
                  <div className='navbar-searchBlock__iconBlock'>
                    <FontAwesomeIcon icon={solid('search')} className='icon' />
                  </div>
                </form>

                <div
                  className={
                    searchFiles?.length
                      ? 'navbar-searchBlock__searchBlockFiles active'
                      : 'navbar-searchBlock__searchBlockFiles'
                  }
                >
                  <div className='navbar-searchBlock__searchResult'>
                    {searchFilesList}
                  </div>
                </div>
              </div>
              <NavLink className='navbar__registration' to={'/userProfile'}>
                <FontAwesomeIcon
                  icon={solid('user')}
                  className='icon navbar__icon'
                />
                Аккаунт
              </NavLink>
              <NavLink className='navbar__registration' to={'/disk'}>
                <FontAwesomeIcon
                  icon={solid('cloud')}
                  className='icon navbar__icon'
                />
                Диск
              </NavLink>
              <Link
                onClick={handlerLogout}
                to={'/'}
                className='navbar__registration navbar__registration_logout'
              >
                <FontAwesomeIcon
                  icon={solid('right-from-bracket')}
                  className='icon navbar__icon'
                />
                Выйти
              </Link>
            </div>
          )}
        </div>
      </div>
    </Headroom>
  )
}

export default Nav
