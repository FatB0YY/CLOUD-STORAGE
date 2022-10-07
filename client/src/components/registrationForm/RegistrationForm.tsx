import { FC, useState } from 'react'
import Input from '../../utils/input/Input'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { registration } from '../../redux/reducers/ActionCreators'
import './registration.scss'
import { Link } from 'react-router-dom'
import Loader from '../Loader'

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  return (
    <form className='registration'>
      <h2 className='registration__header'>Регистрация</h2>
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
        onClick={() => dispatch(registration({ email, password }))}
        className='registration__btn'
      >
        Создать аккаунт
      </button>

      <Link to={'/login'}>Есть аккаунта? Войти</Link>

      {isLoading ? <Loader /> : null}
    </form>
  )
}

export default RegistrationForm
