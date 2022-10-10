import { FC, useState } from 'react'
import Input from '../../utils/input/Input'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { registration } from '../../redux/reducers/ActionCreators'
import './registration.scss'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Loader'

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const createAccount = (event: any) => {
    event.preventDefault()
    dispatch(registration({ email, password }))
  }

  return (
    <form className='registration'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Same as */}
      <ToastContainer />

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
        onClick={(event) => createAccount(event)}
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
