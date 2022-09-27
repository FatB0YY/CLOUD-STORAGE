import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../../models/response/IUser'
import AuthService from '../../service/AuthService'

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

export const logout = createAsyncThunk('registration', async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout()
    localStorage.removeItem('token')
    return {} as IUser
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message)
  }
})
