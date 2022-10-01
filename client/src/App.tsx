import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { checkAuth, logout, getUsers } from './redux/reducers/ActionCreators'

function App() {
  const dispatch = useAppDispatch()
  const { isAuth, user, isLoading, error, users } = useAppSelector(
    (store) => store.userReducer
  )

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!isAuth) {
    return (
      <div>
        <button className="rounded-full" onClick={() => dispatch(getUsers())}>Получить пользователей (не работает)</button>
        <LoginForm />
        <div>{error ? error : null}</div>
      </div>
    )
  }

  return (
    <div className='App'>
      <h1>
        {isAuth ? `Пользователь авторизован ${user.email}` : 'авторизуйтесь пж'}
      </h1>
      <h1>
        {user.isActivated ? 'Аккаунт активирован' : 'активируйте пж'}
      </h1>
      <button className="rounded-full" onClick={() => dispatch(logout())}>Выйти</button>
      <div>
        <button className="rounded-full" onClick={() => dispatch(getUsers())}>Получить пользователей</button>
        {users ? users.map((user) => {
          console.log(user);
          
          return (
            <div key={user._id}>{user.email}</div>
          )
        }
        ) : <div>Пользователей нет</div>}
      </div>
    </div>
  )
}

export default App
