import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import { userAPI } from '../../service/UserAPI'
import sizeFormat from '../../utils/sizeFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import userAvatarDefault from '../../assets/img/userAvatarDefault.png'
import './profileScreen.scss'
import config from '../../config'

const ProfileScreen: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const [getAllUsers, { data = [], isLoading }] =
    userAPI.useLazyGetAllUsersQuery()
  const [uploadAvatar, {}] = userAPI.useUploadAvatarMutation()
  const [deleteAvatar, {}] = userAPI.useDeleteAvatarMutation()

  const [avatar, setAvatar] = useState<string>()

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(`${config.API_URL_WITHOUTAPI + user?.avatar}`)
    } else {
      setAvatar(userAvatarDefault)
    }
  }, [deleteAvatar, avatar, user?.avatar, setAvatar])

  useEffect(() => {}, [user])

  const handleButtonClick = async () => {
    await getAllUsers().unwrap()
  }

  const handleDeleteClick = async () => {
    await deleteAvatar(undefined).unwrap()
  }

  const handleUploadClick = async (e: any) => {
    const file = e.target.files[0]
    await uploadAvatar(file).unwrap()
  }

  if (!user) {
    return <div>Ошибка компонента</div>
  }

  return (
    <div className='profileScreen'>
      <div className='profileScreen__card card'>
        <div className='card__header'>
          <div className='card__main'>
            <div className='card__image'>
              <img src={avatar} alt='avatar user' />
              <div className='card__hover'>
                <label>
                  <input
                    type='file'
                    className='card__input'
                    onChange={(e) => handleUploadClick(e)}
                    accept='image/*'
                  />
                  <FontAwesomeIcon icon={solid('camera')} className='icon' />
                </label>
              </div>
            </div>
            <h3 className='card__id'>{user.id}</h3>
            <h3 className='card__email'>{user.email}</h3>
          </div>
        </div>
        <div className='card__content'>
          <div className='card__descBlock'>
            <h3 className='card__title'>Ваша карточка</h3>
            <p className='card__description'>
              Нажмите на аватарку, чтобы ее поменять
            </p>
            <button
              style={{
                display: `${avatar === userAvatarDefault ? 'none' : 'block'}`,
              }}
              onClick={() => handleDeleteClick()}
            >
              Удалить аватарку
            </button>
          </div>
          <div className='card__infoBlock'>
            <div>
              <span className='card__number'>
                {user.files.length ? user.files.length : 0}
              </span>
              <span className='card__number-title'>Всего файлов</span>
            </div>
            <div>
              <span className='card__number'>{sizeFormat(user.diskSpace)}</span>
              <span className='card__number-title'>Доступная память</span>
            </div>
            <div>
              <span className='card__number'>{sizeFormat(user.usedSpace)}</span>
              <span className='card__number-title'>Занято</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button style={{ display: 'none' }} onClick={handleButtonClick}>
          Получить пользователей
        </button>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((user) => <div key={user.id}>{user.email}</div>)
        )}
      </div>
    </div>
  )
}

export default ProfileScreen
