import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthResponse } from '../../models/response/AuthResponse'
import AuthService from '../../service/AuthService'
import UserService from '../../service/UserServise'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import $api from '../../http'

import Cookies from 'js-cookie'

interface UserData {
  email: string
  password: string
}

export const login = createAsyncThunk(
  'login',
  async ({ email, password }: UserData, thunkAPI) => {
    const notifySuccess = () =>
      toast.success('Вход в аккаунт выполнен успешно!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    const notifyError = (error: string) =>
      toast.error(`${error}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    try {
      const response = await AuthService.login(email, password)
      Cookies.set('token', response.data.accessToken, {expires: 7})
      notifySuccess()
      return response.data.user
    } catch (error: any) {
      notifyError(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const registration = createAsyncThunk(
  'registration',
  async ({ email, password }: UserData, thunkAPI) => {
    const notifySuccess = () =>
      toast.success('Пользователь создан!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    const notifyError = (error: string) =>
      toast.error(`${error}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    try {
      const response = await AuthService.registration(email, password)
      Cookies.set('token', response.data.accessToken, {expires: 7})
      notifySuccess()
      return response.data.user
    } catch (error: any) {
      notifyError(error.response?.data?.message)
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout()
    Cookies.remove('token')
    return {}
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const checkAuth = createAsyncThunk('checkAuth', async (_, thunkAPI) => {
  try {
    const response = await $api.get<AuthResponse>('/auth/refresh')    
    Cookies.set('token', response.data.accessToken, {expires: 7})
    return response.data.user
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const getUsers = createAsyncThunk('getUsers', async (_, thunkAPI) => {
  try {
    const response = await UserService.fetchUsers()
    return response.data ? response.data : response
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const getFiles = createAsyncThunk(
  'getFiles',
  async (dirId: any, thunkAPI): Promise<any> => {
    try {
      const response = await $api.get(
        `/files${dirId ? '?parent=' + dirId : ''}`, {
          headers: {Authorization: `Bearer ${Cookies.get('token')}`}
        }
      )
      console.log('response.data', response.data)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)
