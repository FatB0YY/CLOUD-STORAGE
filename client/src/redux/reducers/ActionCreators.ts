import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthResponse } from '../../models/response/AuthResponse'
import AuthService from '../../service/AuthService'
import UserService from '../../service/UserServise'
import FileService from '../../service/FileService'
import $api from '../../http'
import Cookies from 'js-cookie'


interface UserData{
  email: string,
  password: string
}

interface DirData{
  currentDir: string | null | undefined,
  name: string
}

export const login = createAsyncThunk('login', async ({ email, password }: UserData, thunkAPI): Promise<any> => {
  try {
    const response = await AuthService.login(email, password)
    Cookies.set('token', response.data.accessToken, {expires: 7})
    return response.data.user
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const registration = createAsyncThunk(
  'registration',
  async ({ email, password }: UserData, thunkAPI): Promise<any> => {
    try {
      const response = await AuthService.registration(email, password)
      Cookies.set('token', response.data.accessToken, { expires: 7 })
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

export const logout = createAsyncThunk('logout', async (_, thunkAPI): Promise<any> => {
  try {
    const response = await AuthService.logout()
    Cookies.remove('token')
    return {}
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const checkAuth = createAsyncThunk('checkAuth', async (_, thunkAPI): Promise<any> => {
  try {
    const response = await $api.get<AuthResponse>('/auth/refresh')
    Cookies.set('token', response.data.accessToken, { expires: 7 })
    return response.data.user
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})

export const getUsers = createAsyncThunk('getUsers', async (_, thunkAPI): Promise<any> => {
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
  async (dirId: string | null | undefined, thunkAPI) => {
    try {
      const response = await FileService.fetchFiles(dirId)
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

export const createDir = createAsyncThunk(
  'createDir',
  async ({ currentDir, name }: DirData, thunkAPI): Promise<any> => {
    try {
      const response = await FileService.createDir(currentDir, name)
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

export const uploadFile = createAsyncThunk(
  'uploadFile',
  async ({ file, dirId }: any, thunkAPI): Promise<any> => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      if(dirId){
        formData.append('parent', dirId)
      }

      const response = await FileService.uploadFile(dirId, file, formData)
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
