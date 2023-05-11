import { AuthResponse } from '../models/response/AuthResponse'
import { UserDataAuthLogin, UserDataAuthReg } from '../models/response/IUser'
import { rtkAPI } from './rtkAPI'

export const authAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, UserDataAuthLogin>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    registration: build.mutation<AuthResponse, UserDataAuthReg>({
      query: (credentials) => ({
        url: '/auth/registration',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    checkAuth: build.query<AuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
      }),
    }),
  }),
})

export const { useCheckAuthQuery, useLoginMutation, useRegistrationMutation, useLogoutMutation } = authAPI
