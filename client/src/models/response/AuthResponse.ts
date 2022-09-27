import { IUser } from "./IUser"

// что придет с сервера после логина, регистрации, рефреша
export interface AuthResponse {
    accessToken: string
    refreshToken: string
    // user-dto
    user: IUser
}