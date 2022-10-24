import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { login, checkAuth } from '../../redux/reducers/ActionCreators'
import './login.scss'
import Loader from '../Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import Cookies from 'js-cookie'

interface IAuthForm {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const { isLoading, error, isAuth } = useAppSelector(
    (state) => state.userReducer
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IAuthForm>({
    mode: 'onBlur',
  })

  useEffect(() => {
    // возможен цикл
    if (Cookies.get('token')) {
      dispatch(checkAuth())
    }

    if (isAuth) navigate('/disk')
  }, [navigate, isAuth])

  const onSubmit: SubmitHandler<IAuthForm> = ({ email, password }) => {
    email = email.toLowerCase()
    dispatch(login({ email, password }))
    reset()
  }

  return (
    <form className='login' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='login__header'>Вход в аккаунт</h2>

      <input
        {...register('email', {
          required: 'Поле обязательно к заполнению',
          maxLength: {
            value: 128,
            message: 'Максимум 128 символов',
          },
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Некорректный email',
          },
        })}
        type='email'
        id='email-address'
        placeholder='Введите email'
      />
      <div style={{ height: 20 }}>
        {errors?.email && (
          <p>{errors?.email?.message || 'Неизвестная ошибка'}</p>
        )}
      </div>

      <input
        {...register('password', {
          required: 'Поле обязательно к заполнению',
          minLength: {
            value: 8,
            message: 'Минимум 8 символов',
          },
          maxLength: {
            value: 128,
            message: 'Максимум 128 символов',
          },
        })}
        type='password'
        id='password'
        placeholder='Введите пароль'
      />
      <div style={{ height: 40 }}>
        {errors?.password && (
          <p>{errors?.password?.message || 'Неизвестная ошибка'}</p>
        )}
      </div>

      <button disabled={isLoading} className='login__btn'>
        Войти
      </button>

      <Link to={'/registration'}>Нет аккаунта? Зарегистрироваться</Link>

      {error ? error : null}
      {isLoading ? <Loader /> : null}
    </form>
  )
}

export default LoginForm
