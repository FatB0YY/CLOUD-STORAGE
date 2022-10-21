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
  error: string | null
  isAuth: boolean
  registrationAccess: boolean
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
  error: null,
  isAuth: false,
  registrationAccess: false,
  users: [],
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: {
    // ожидание
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    // успешная загрузка
    [login.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = null
      state.user = action.payload
      state.isAuth = true
      state.registrationAccess = true
    },
    // ошибка
    [login.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuth = false
    },



    // ожидание
    [logout.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    // успешная загрузка
    [logout.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = null
      state.user = action.payload
      state.isAuth = false
      state.registrationAccess = false
    },
    // ошибка
    [logout.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },

    
    // ожидание
    [registration.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    // успешная загрузка
    [registration.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = null
      state.user = action.payload
      state.registrationAccess = true
    },
    // ошибка
    [registration.rejected.type]: (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    },





    // ожидание
    [checkAuth.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    // успешная загрузка
    [checkAuth.fulfilled.type]: (state, action: any) => {
      state.isLoading = false
      state.error = null
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
