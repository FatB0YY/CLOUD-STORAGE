import { IUser } from '../../models/response/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../service/AuthAPI'
import Cookies from 'js-cookie'
import { AuthResponse } from '../../models/response/AuthResponse'
import { RootState } from '../store'
import { filesAPI } from '../../service/FilesAPI'
import { userAPI } from '../../service/UserAPI'

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
    // logout
    builder.addMatcher(
      authAPI.endpoints.logout.matchFulfilled,
      (state, action) => {
        Cookies.remove('accessToken')
        state.user = null
      }
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
      filesAPI.endpoints.deleteFile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
      }
    )

    builder.addMatcher(
      filesAPI.endpoints.uploadFile.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
      }
    )

    builder.addMatcher(
      userAPI.endpoints.uploadAvatar.matchFulfilled,
      (state, action) => {
        state.user = action.payload
      }
    )
  },
})

export default userSlice.reducer
export const { logOut, setUser } = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.userReducer.user
