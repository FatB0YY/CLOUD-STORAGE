import axios from 'axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

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
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
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
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (error) {
        console.log('НЕ АВТОРИЗОВАН')
        console.log(error)
      }
    } else {
      throw error
    }
  }
)

export default $api
