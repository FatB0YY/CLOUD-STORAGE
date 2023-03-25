import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
import { useLoginMutation } from '../../service/AuthAPI'
import { toast } from 'react-toastify'
import './authForm.scss'

import waveImg from '../../assets/img/wave.svg'
import secureImg from '../../assets/img/secure_login_pdn4.svg'
import avatarImg from '../../assets/img/male_avatar_g98d.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

interface IAuthForm {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const [login, { isLoading, isSuccess }] = useLoginMutation()
  const navigate = useNavigate()

  const [classEmail, setClassEmail] = useState('authForm__input-div one')
  const [classPassword, setClassPassword] = useState('authForm__input-div one')

  function focusFunc(type: 'email' | 'password') {
    if (type === 'email') {
      setClassEmail('authForm__input-div focus one')
    }

    if (type === 'password') {
      setClassPassword('authForm__input-div focus pass')
    }
  }

  function blurFunc(type: 'email' | 'password') {
    if (type === 'email') {
      console.log(getFieldState('email').isDirty)

      if (!getFieldState('email').isDirty) {
        setClassEmail('authForm__input-div one')
      }
    }

    if (type === 'password') {
      if (!getFieldState('password').isDirty) {
        setClassPassword('authForm__input-div pass')
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getFieldState,
  } = useForm<IAuthForm>({
    mode: 'all',
  })

  const onSubmit: SubmitHandler<IAuthForm> = async ({ email, password }) => {
    email = email.toLowerCase()
    await login({ email, password }).unwrap()
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Вход успешно выполнен')
      navigate('/disk')
    }

    if (user) navigate('/disk')
  }, [navigate, isSuccess, user])

  return (
    <div className='container'>
      <div className='authForm'>
        <img className='authForm__wave' src={waveImg} />
        <div className='containerAuth'>
          <div className='authForm__img'>
            <img src={secureImg} />
          </div>
          <div className='authForm__content'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <img src={avatarImg} />
              <h2 className='authForm__title'>добро пожаловать!</h2>

              <div
                className={
                  errors.email ? 'authForm__input-div error one' : classEmail
                }
              >
                <div className='authForm__i'>
                  <FontAwesomeIcon icon={solid('user')} className='icon' />
                </div>
                <div className='authForm__div'>
                  <h5>Электронная почта</h5>
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
                    className='authForm__input'
                    onFocus={() => focusFunc('email')}
                    // onBlur={() => blurFunc('email')}
                  />
                </div>
              </div>
              <div style={{ height: '20px', marginBottom: '20px' }}>
                {errors?.email && (
                  <p style={{ color: 'red' }}>
                    {errors?.email?.message || 'Неизвестная ошибка'}
                  </p>
                )}
              </div>

              <div
                className={
                  errors.password
                    ? 'authForm__input-div error pass'
                    : classPassword
                }
              >
                <div className='authForm__i'>
                  <FontAwesomeIcon icon={solid('lock')} className='icon' />
                </div>
                <div className='authForm__div'>
                  <h5>Пароль</h5>
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
                    className='authForm__input'
                    onFocus={() => focusFunc('password')}
                    // onBlur={() => blurFunc('password')}
                  />
                </div>
              </div>

              <div style={{ height: '20px' }}>
                {errors?.password && (
                  <p style={{ color: 'red' }}>
                    {errors?.password?.message || 'Неизвестная ошибка'}
                  </p>
                )}
              </div>

              <Link to={'/registration'}>Нет аккаунта?</Link>
              <button
                disabled={isLoading || !isValid}
                type='submit'
                className='authForm__btn'
              >
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={solid('spinner')}
                    className='icon icon-spinner'
                  />
                ) : (
                  'вход'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
