import { AuthResponse } from '../models/response/AuthResponse'
import { rtkAPI } from './rtkAPI'

export const authAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    registration: build.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
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

export const {
  useCheckAuthQuery,
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
} = authAPI
