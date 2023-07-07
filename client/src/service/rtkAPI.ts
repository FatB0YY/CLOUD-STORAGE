import { createApi } from '@reduxjs/toolkit/query/react'
import config from '../config/index'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import Cookies from 'js-cookie'
import { AuthResponse } from '../models/response/AuthResponse'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // подождем, пока mutex не станет доступен, не блокируя его
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // проверка того, заблокирован ли mutex
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        // попытка получить новый токен
        const refreshResult = await baseQuery('user/refresh', api, extraOptions)
        if (refreshResult.data) {
          Cookies.set('accessToken', (refreshResult.data as AuthResponse).accessToken, { expires: 7 })
          // сохраняем
          baseQueryWithReauth(args, api, extraOptions)
          api.dispatch({ type: 'userSlice/setUser', payload: refreshResult.data })
          // повторяем первоначальный запрос
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch({ type: 'userSlice/logOut' })
        }
      } finally {
        // release должен быть вызван один раз, когда mutex должен быть запущен снова.
        release()
      }
    } else {
      // подождем, пока mutex не станет доступен, не блокируя его
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const rtkAPI = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users', 'Files'],
  endpoints: (build) => ({}),
})
