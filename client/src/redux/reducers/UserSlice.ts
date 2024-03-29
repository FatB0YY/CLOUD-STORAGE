import { IUser } from '../../models/response/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../service/AuthAPI'
import Cookies from 'js-cookie'
import { AuthResponse } from '../../models/response/AuthResponse'
import { RootState } from '../store'
import { filesAPI } from '../../service/FilesAPI'
import { userAPI } from '../../service/UserAPI'
import { toast } from 'react-toastify'

interface UserState {
  user: IUser | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
    },
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    // Fulfilled
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
      state.user = action.payload.user
    })

    builder.addMatcher(authAPI.endpoints.registration.matchFulfilled, (state, action) => {
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
      state.user = action.payload.user
    })
    builder.addMatcher(authAPI.endpoints.logout.matchFulfilled, (state, action) => {
      Cookies.remove('accessToken')
      state.user = null
    })
    builder.addMatcher(authAPI.endpoints.checkAuth.matchFulfilled, (state, action) => {
      Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
      state.user = action.payload.user
    })
    builder.addMatcher(filesAPI.endpoints.deleteFile.matchFulfilled, (state, action) => {
      state.user = action.payload.user
    })

    builder.addMatcher(filesAPI.endpoints.uploadFile.matchFulfilled, (state, action) => {
      state.user = action.payload.user
    })

    builder.addMatcher(userAPI.endpoints.uploadAvatar.matchFulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addMatcher(userAPI.endpoints.deleteAvatar.matchFulfilled, (state, action) => {
      state.user = action.payload
    })

    builder.addMatcher(filesAPI.endpoints.createDir.matchFulfilled, (state, action) => {
      state.user = action.payload.user
    })

    // Rejected
    builder.addMatcher(authAPI.endpoints.login.matchRejected, (state, action: any) => {
      toast.error(action.payload?.data.message)
      state.user = null
    })

    builder.addMatcher(authAPI.endpoints.registration.matchRejected, (state, action: any) => {
      toast.error(action.payload?.data.message)
    })
  },
})

export const { reducer: userReducer, actions: userActions } = userSlice
export const selectCurrentUser = (state: RootState) => state.user.user
