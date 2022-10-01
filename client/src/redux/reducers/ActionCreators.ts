import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../http'
import { AuthResponse } from '../../models/response/AuthResponse'
import AuthService from '../../service/AuthService'
import UserService from '../../service/UserServise'

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
      return response.data.user
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const registration = createAsyncThunk(
  'registration',
  async ({ email, password }: UserData, thunkAPI) => {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      return response.data.user
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout()
    localStorage.removeItem('token')
    return {}
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const checkAuth = createAsyncThunk('checkAuth', async (_, thunkAPI) => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    })
    localStorage.setItem('token', response.data.accessToken)
    return response.data.user
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})

export const getUsers = createAsyncThunk(
  'getUsers',
  async (_, thunkAPI) => {
    try {
      const response = await UserService.fetchUsers()    
      return response.data ? response.data : response
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)
