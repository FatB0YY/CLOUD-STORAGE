import { IUser } from '../../models/response/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, logout, registration } from './ActionCreators'

interface UserState {
  user: IUser
  isLoading: boolean
  error: string
  isAuth: boolean
}

const initialState: UserState = {
  user: {
    email: '',
    isActivated: false,
    id: '',
  },
  isLoading: false,
  error: '',
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
  },
  extraReducers: {
    // ожидание
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ''
      console.log(action.payload)
      state.user = action.payload
      state.isAuth = true
    },
    // ошибка
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      console.log(action.payload)
      state.error = action.payload
    },
    // ожидание
    [logout.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [logout.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ''
      console.log(action.payload)
      state.user = action.payload
      state.isAuth = false
    },
    // ошибка
    [logout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      console.log(action.payload)
      state.error = action.payload
    },
    // ожидание
    [registration.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    // успешная загрузка
    [registration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ''
      console.log(action.payload)
      state.user = action.payload
      state.isAuth = true
    },
    // ошибка
    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      console.log(action.payload)
      state.error = action.payload
    },
  },
})

export default userSlice.reducer
