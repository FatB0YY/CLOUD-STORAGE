import axios from 'axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import Cookies from 'js-cookie'

export const API_URL = 'http://localhost:8080/api'

const $api = axios.create({
  // каждый запрос с куки
  withCredentials: true,
  baseURL: API_URL,
})

// интерцепторы (перехватчик)
$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) {
    return config
  }

  // перед каждый запросом устанавливаем header.Authorization
  config.headers.Authorization = `Bearer ${Cookies.get('token')}`
  return config

  // получение ответа от сервера. смотрим на статус код:
  // 1. 401 (не авторизован) - отправляем запрос на обновление токена доступа
  // повторяем запрос с обн токеном
})

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        // чтобы не было цикла
        originalRequest._isRetry = true
        // переделать
        const response = await $api.get<AuthResponse>('/auth/refresh')
        Cookies.set('token', response.data.accessToken, {expires: 7})
        return $api.request(originalRequest)
      } catch (error) {
        console.log('НЕ АВТОРИЗОВАН')
        console.log('error (http index):', error)
      }
    } else {
      throw error
    }
  }
)

export default $api
