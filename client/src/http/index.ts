import axios from "axios";
import { AxiosRequestConfig } from 'axios'

export const API_URL = 'http://localhost:8080/api'

const $api = axios.create({
    // каждый запрос с куки
    withCredentials: true,
    baseURL: API_URL
})

// интерцепторы (перехватчик)
$api.interceptors.request.use((config: AxiosRequestConfig) => {
    if(!config.headers){
        return config
    }

    // перед каждый запросом устанавливаем header.Authorization
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config

    // получение ответа от сервера. смотрим на статус код:
    // 1. 401 (не авторизован) - отправляем запрос на обновление токена доступа
    // повторяем запрос с обн токеном
})

export default $api