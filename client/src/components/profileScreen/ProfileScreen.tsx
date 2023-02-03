import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import { userAPI } from '../../service/UserAPI'
import './profileScreen.scss'

const ProfileScreen: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const [trigger, { data = [], isLoading }] = userAPI.useLazyGetAllUsersQuery()

  const handleButtonClick = async () => {
    await trigger().unwrap()
  }

  if(user){
    return (
      <div>
        <div>Email: {user.email}</div>
        <div>Id: {user.id}</div>
        <div>Аккаунт {user.isActivated ? '' : 'не'} активирован</div>
        {/* <div>Использовано памяти: {user.usedSpace}</div>
        <div>Всего памяти: {user.diskSpace}</div> */}
  
        <button onClick={handleButtonClick}>Получить пользователей</button>
  
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((user) => <div key={user.id}>{user.email}</div>)
        )}
      </div>
    )
  } else {
    return (
      <div>Ошибка компонента ProfileScreen</div>
    )
  }
}

export default ProfileScreen
