import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { registration, checkAuth } from '../../redux/reducers/ActionCreators'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../loader/Loader'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'
import Swal from 'sweetalert2'
import './registration.scss'
import Cookies from 'js-cookie'

interface IAuthForm {
  email: string
  password: string
  confirm_password: string
}

const RegistrationForm: FC = () => {
  const { isLoadingForm, isLoadingMain, errorReg, registrationAccess, isAuth } =
    useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [width, height] = useWindowSize()

  useEffect(() => {
    // возможен цикл
    if (Cookies.get('token')) {
      dispatch(checkAuth())
    }

    // редирект если пользователь вошел в аккаунт
    if (isAuth) {
      Swal.fire({
        icon: 'success',
        title: 'Аккаунт успешно создан!',
        showConfirmButton: false,
        timer: 5000,
      })
      setTimeout(() => {
        navigate('/disk')
      }, 5000)
    }
  }, [navigate, registrationAccess, isAuth, dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IAuthForm>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IAuthForm> = ({
    email,
    password,
    confirm_password,
  }) => {
    email = email.toLowerCase()
    dispatch(registration({ email, password }))
    reset()
  }

  if(isLoadingMain){
    return <Loader type='main'/>
  }

  return (
    <form className='registration' onSubmit={handleSubmit(onSubmit)}>
      {registrationAccess ? <Confetti width={width} height={height} /> : null}
      <h2 className='registration__header'>Регистрация</h2>

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

      <input
        {...register('confirm_password', {
          required: 'Поле обязательно к заполнению',
          minLength: {
            value: 8,
            message: 'Минимум 8 символов',
          },
          maxLength: {
            value: 128,
            message: 'Максимум 128 символов',
          },
          validate: (val: string) => {
            if (watch('password') !== val) {
              return 'Ваши пароли не совпадают'
            }
          },
        })}
        type='password'
        id='confirm_password'
        placeholder='Подтвердите пароль'
      />
      <div style={{ height: 40 }}>
        {errors?.confirm_password && (
          <p>{errors?.confirm_password?.message || 'Неизвестная ошибка'}</p>
        )}
      </div>

      <button disabled={isLoadingForm} type='submit' className='registration__btn'>
        Создать аккаунт
      </button>

      <Link to={'/login'}>Есть аккаунта? Войти</Link>

      {isLoadingForm ? <Loader type='form' /> : null}
      {errorReg ? errorReg : null}
    </form>
  )
}

export default RegistrationForm
