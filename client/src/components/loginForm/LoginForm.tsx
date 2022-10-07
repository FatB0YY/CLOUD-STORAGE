import { FC, useState } from 'react'
import Input from '../../utils/input/Input'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { login } from '../../redux/reducers/ActionCreators'
import './login.scss'
import Loader from '../Loader'
import { Link } from 'react-router-dom'

const LoginForm: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  return (
    <form className='login'>
      <h2 className='login__header'>Вход в аккаунт</h2>
      <Input
        setValue={setEmail}
        value={email}
        id='email-address'
        name='email'
        type='email'
        placeholder='Введите email'
      />
      <Input
        setValue={setPassword}
        value={password}
        id='password'
        name='password'
        type='password'
        placeholder='Введите пароль'
      />
      <button
        onClick={() => dispatch(login({ email, password }))}
        className='login__btn'
      >
        Войти
      </button>

      <Link to={'/registration'}>Нет аккаунта? Зарегистрироваться</Link>

      {isLoading ? <Loader /> : null}
    </form>
  )
}

export default LoginForm
