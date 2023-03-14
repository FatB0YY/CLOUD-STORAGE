import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useRegistrationMutation } from '../../service/AuthAPI'
import { selectCurrentUser } from '../../redux/reducers/UserSlice'
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
  confirm_password: string
}

const RegistrationForm: FC = () => {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()

  const [registration, { isLoading, isSuccess }] =
    useRegistrationMutation()

  const [classEmail, setClassEmail] = useState('authForm__input-div one')
  const [classPassword, setClassPassword] = useState('authForm__input-div pass')
  const [classPasswordConfirm, setClassPasswordConfirm] = useState(
    'authForm__input-div pass'
  )

  function focusFunc(type: 'email' | 'password' | 'confirm_password') {
    if (type === 'email') {
      setClassEmail('authForm__input-div focus one')
    }

    if (type === 'password') {
      setClassPassword('authForm__input-div focus pass')
    }

    if (type === 'confirm_password') {
      setClassPasswordConfirm('authForm__input-div focus pass')
    }
  }

  function blurFunc(type: 'email' | 'password' | 'confirm_password') {
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

    if (type === 'confirm_password') {
      if (!getFieldState('confirm_password').isDirty) {
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
    watch,
  } = useForm<IAuthForm>({
    mode: 'all',
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Аккаунт успешно создан')
      setTimeout(() => {
        navigate('/disk')
      }, 3000)
    }

    if (user) {
      navigate('/disk')
    }
  }, [navigate, isSuccess, user])

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
              <h2 className='authForm__title'>Создать аккаунт</h2>

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
              <div style={{ height: '20px', marginBottom: '20px' }}>
                {errors?.password && (
                  <p style={{ color: 'red' }}>
                    {errors?.password?.message || 'Неизвестная ошибка'}
                  </p>
                )}
              </div>

              <div
                className={
                  errors.confirm_password
                    ? 'authForm__input-div error pass'
                    : classPasswordConfirm
                }
              >
                <div className='authForm__i'>
                  <FontAwesomeIcon icon={solid('lock')} className='icon' />
                </div>
                <div className='authForm__div'>
                  <h5>Подтвердите пароль</h5>
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
                    className='authForm__input'
                    onFocus={() => focusFunc('confirm_password')}
                    // onBlur={() => blurFunc('confirm_password')}
                  />
                </div>
              </div>

              <div style={{ height: '20px', marginBottom: '20px' }}>
                {errors?.confirm_password && (
                  <p style={{ color: 'red' }}>
                    {errors?.confirm_password?.message || 'Неизвестная ошибка'}
                  </p>
                )}
              </div>

              <Link to={'/login'}>Есть аккаунт?</Link>
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
                  'Создать'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
