import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthResponse } from '../../models/response/AuthResponse'
import AuthService from '../../service/AuthService'
import UserService from '../../service/UserServise'
import $api from '../../http'
import Cookies from 'js-cookie'

interface UserData {
  email: string
  password: string
}

export const login = createAsyncThunk(
  'login',
  async ({ email, password }: UserData, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      // { expires: 7 }
      return response.data.user
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      } else {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  }
)

export const registration = createAsyncThunk(
  'registration',
  async ({ email, password }: UserData, thunkAPI) => {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      // { expires: 7 }
      return response.data.user
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      } else {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  }
)

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout()
    localStorage.removeItem('token')
    return {}
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const checkAuth = createAsyncThunk('checkAuth', async (_, thunkAPI) => {
  try {
    const response = await $api.get<AuthResponse>('/auth/refresh')
    localStorage.setItem('token', response.data.accessToken)
    //{ expires: 7 }
    return response.data.user
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const getUsers = createAsyncThunk('getUsers', async (_, thunkAPI) => {
  try {
    const response = await UserService.fetchUsers()
    return response.data ? response.data : response
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const getFiles = createAsyncThunk(
  'getFiles',
  async (dirId: any, thunkAPI): Promise<any> => {
    try {
      const response = await $api.get(
        `/files${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      return response.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      } else {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  }
)
