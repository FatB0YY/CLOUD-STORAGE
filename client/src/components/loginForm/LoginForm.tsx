import Loader from '../loader/Loader'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import { useLoginMutation } from '../../service/AuthAPI'
import { toast } from 'react-toastify'
import './login.scss'

interface IAuthForm {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Вход успешно выполнен')
      navigate('/disk')
    }

    if (user) navigate('/disk')

    if (isError) {
      console.log(error)
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
  }, [navigate, isSuccess, user, error, isError])

  const onSubmit: SubmitHandler<IAuthForm> = async ({ email, password }) => {
    email = email.toLowerCase()
    await login({ email, password }).unwrap()
    reset()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthForm>({
    mode: 'onBlur',
  })

  return (
    <form className='login' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='login__header'>Вход в аккаунт</h2>

      <input
        {...register('email', {
          required: 'Поле обязательно к заполнению',
          maxLength: {
            value: 256,
            message: 'Максимум 256 символов',
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

      <button disabled={isLoading} className='login__btn'>
        Войти
      </button>

      <div>
        <h5>
          Нет аккаунта?
          <Link to={'/registration'}>Создать</Link>
        </h5>
      </div>

      {isLoading ? <Loader type='form' /> : null}
    </form>
  )
}

export default LoginForm
