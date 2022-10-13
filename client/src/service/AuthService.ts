import $api from '../http'
import { AuthResponse } from '../models/response/AuthResponse'
import { AxiosResponse } from 'axios'

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password })
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/registration', { email, password })
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/logout')
  }
}

// axios всегда возвращает объект, а данные в теле ответа хранятся в data
// чтобы указать для них тип, используем AxiosResponse, типа AuthResponse - явно указываем
