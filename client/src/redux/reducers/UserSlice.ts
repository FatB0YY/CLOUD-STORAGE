import { IUser } from '../../models/response/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../service/AuthAPI'
import Cookies from 'js-cookie'
import { AuthResponse } from '../../models/response/AuthResponse'
import { RootState } from '../store'

interface UserState {
  user: IUser | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
    },
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    // login
    builder.addMatcher(
      authAPI.endpoints.login.matchFulfilled,
      (state, action) => {
        Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
        state.user = action.payload.user
      }
    )
    builder.addMatcher(authAPI.endpoints.login.matchRejected, (state) => {
      state.user = null
    })
    // reg
    builder.addMatcher(
      authAPI.endpoints.registration.matchFulfilled,
      (state, action) => {
        Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
        state.user = action.payload.user
      }
    )
    builder.addMatcher(
      authAPI.endpoints.registration.matchRejected,
      (state, action) => {}
    )
    // logout
    builder.addMatcher(
      authAPI.endpoints.logout.matchFulfilled,
      (state, action) => {
        Cookies.remove('accessToken')
        state.user = null
      }
    )
    builder.addMatcher(
      authAPI.endpoints.logout.matchRejected,
      (state, action) => {}
    )
    // check
    builder.addMatcher(
      authAPI.endpoints.checkAuth.matchFulfilled,
      (state, action) => {
        Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
        state.user = action.payload.user
      }
    )
    builder.addMatcher(
      authAPI.endpoints.checkAuth.matchRejected,
      (state, action) => {}
    )
  },
})

export default userSlice.reducer
export const { logOut, setUser } = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.userReducer.user
