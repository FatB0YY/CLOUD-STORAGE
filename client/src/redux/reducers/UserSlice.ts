import { IUser } from '../../models/response/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  checkAuth,
  login,
  logout,
  registration,
  getUsers,
} from './ActionCreators'

interface UserState {
  user: IUser
  isLoading: boolean
  error: string
  isAuth: boolean
  users: Array<IUser>
}

const initialState: UserState = {
  user: {
    email: '',
    isActivated: false,
    id: '',
    diskSpace: 10737418240,
    files: [],
    usedSpace: 0
  },
  isLoading: false,
  error: '',
  isAuth: false,
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // ожидание
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [login.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = ''
      state.user = action.payload
      state.isAuth = true
    },
    // ошибка
    [login.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },
    // ожидание
    [logout.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [logout.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = ''
      state.user = action.payload
      state.isAuth = false
    },
    // ошибка
    [logout.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },
    // ожидание
    [registration.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [registration.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = ''
      state.user = action.payload
      state.isAuth = true
    },
    // ошибка
    [registration.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },
    // ожидание
    [checkAuth.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [checkAuth.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = ''
      state.user = action.payload
      state.isAuth = true
    },
    // ошибка
    [checkAuth.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },
    // ожидание
    [getUsers.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [getUsers.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    // ошибка
    [getUsers.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default userSlice.reducer
