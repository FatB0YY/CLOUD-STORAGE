import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUsers } from '../../redux/reducers/ActionCreators'
import './profileScreen.scss'

const ProfileScreen: FC = () => {
  const { user, users } = useAppSelector((store) => store.userReducer)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>Email: {user.email}</div>
      <div>Id: {user.id}</div>
      <div>Активирован ли аккаунт: {user.isActivated ? 'Да' : 'Нет'}</div>
      <div>Использовано памяти: {user.usedSpace}</div>
      <div>Всего памяти: {user.diskSpace}</div>

      <button onClick={() => dispatch(getUsers())}>Получить пользователей</button>

      {users.map((user) => {
        return <div key={user.id}>{user.email}</div>
      })}
    </div>
  )
}

export default ProfileScreen
