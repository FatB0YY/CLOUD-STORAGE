import { FC, useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../loader/Loader'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useRegistrationMutation } from '../../service/AuthAPI'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import { toast } from 'react-toastify'
import './registration.scss'

interface IAuthForm {
  email: string
  password: string
  confirm_password: string
}

const RegistrationForm: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()

  const [registration, { isLoading, isSuccess, isError, error }] =
    useRegistrationMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Аккаунт успешно создан')
      setTimeout(() => {
        navigate('/disk')
      }, 3000)
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        ;(error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        )
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        })
      }
    }

    if (user) {
      navigate('/disk')
    }
  }, [navigate, isSuccess, user, error, isError])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IAuthForm>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IAuthForm> = async ({
    email,
    password,
    confirm_password,
  }) => {
    email = email.toLowerCase()
    await registration({ email, password }).unwrap()
    reset()
  }

  return (
    <form className='registration' onSubmit={handleSubmit(onSubmit)}>
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
            message: 'Некорректный адрес электронной почты',
          },
        })}
        type='email'
        id='email-address'
        placeholder='Введите адрес электронной почты'
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
            value: 256,
            message: 'Максимум 256 символов',
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
            value: 256,
            message: 'Максимум 256 символов',
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

      <button disabled={isLoading} type='submit' className='registration__btn'>
        Создать аккаунт
      </button>

      <div>
        <h5>
          Есть аккаунт?
          <Link to={'/login'}>Войти</Link>
        </h5>
      </div>

      {isLoading ? <Loader type='form' /> : null}
    </form>
  )
}

export default RegistrationForm
