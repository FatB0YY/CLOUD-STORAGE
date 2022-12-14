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
  isAuth: boolean
  registrationAccess: boolean
  users: Array<IUser>

  errorLogin: string | null
  errorReg: string | null

  isLoadingForm: boolean
  isLoadingMain: boolean
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
  isAuth: false,
  registrationAccess: false,
  users: [],

  errorLogin: null,
  errorReg: null,

  isLoadingForm: false,
  isLoadingMain: false
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: {
    // ожидание
    [login.pending.type]: (state) => {
      state.isLoadingForm = true
      state.errorLogin = null
    },
    // успешная загрузка
    [login.fulfilled.type]: (state, action: any) => {
      state.isLoadingForm = false
      state.errorLogin = null
      state.user = action.payload
      state.isAuth = true
      state.registrationAccess = true
    },
    // ошибка
    [login.rejected.type]: (state, action: any) => {
      state.isLoadingForm = false
      state.errorLogin = action.payload
      state.isAuth = false
    },



    // ожидание
    [logout.pending.type]: (state) => {
      state.isLoadingForm = true
      state.errorLogin = null
      state.errorReg = null
    },
    // успешная загрузка
    [logout.fulfilled.type]: (state, action: any) => {
      state.isLoadingForm = false
      state.errorLogin = null
      state.errorReg = null
      state.user = action.payload
      state.isAuth = false
      state.registrationAccess = false
    },
    // ошибка
    [logout.rejected.type]: (state, action: any) => {
      state.isLoadingForm = false
      state.errorLogin = action.payload
      state.errorReg = null
    },

    
    // ожидание
    [registration.pending.type]: (state) => {
      state.isLoadingForm = true
      state.errorReg = null
    },
    // успешная загрузка
    [registration.fulfilled.type]: (state, action: any) => {
      state.isLoadingForm = false
      state.errorReg = null
      state.user = action.payload
      state.registrationAccess = true
    },
    // ошибка
    [registration.rejected.type]: (state, action: any) => {
      state.isLoadingForm = false
      state.errorReg = action.payload
    },





    // ожидание
    [checkAuth.pending.type]: (state) => {
      state.isLoadingMain = true
    },
    // успешная загрузка
    [checkAuth.fulfilled.type]: (state, action: any) => {
      state.isLoadingMain = false
      state.user = action.payload
      state.isAuth = true
    },
    // ошибка
    [checkAuth.rejected.type]: (state, action: any) => {
      state.isLoadingMain = false
    },



    // ожидание
    [getUsers.pending.type]: (state) => {
      state.isLoadingMain = true
    },
    // успешная загрузка
    [getUsers.fulfilled.type]: (state, action: any) => {
      state.isLoadingMain = false
      state.users = action.payload
    },
    // ошибка
    [getUsers.rejected.type]: (state, action: any) => {
      state.isLoadingMain = false
    },
  },
})

export default userSlice.reducer
