import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import config from '../config'
import { IFile } from '../models/response/IFile'
import { IUser } from '../models/response/IUser'
import { rtkAPI } from './rtkAPI'

export const userAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: 'auth/users',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LISTUSERS' },
            ]
          : [{ type: 'Users', id: 'LISTUSERS' }],
    }),
    uploadAvatar: build.mutation<IUser, IFile>({
      async queryFn(file) {
        try {
          const formData = new FormData()
          // blob
          formData.append('file', file as any)

          const response = await axios.post(
            `${config.API_URL}/files/avatar`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
              },
              withCredentials: true,
            }
          )
          
          return { data: response.data }
        } catch (error: any) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message)
            return { error: error.response.data.message }
          } else {
            toast.error(error.message)
            return { error: error.message }
          }
        }
      },
    }),

    deleteAvatar: build.mutation<IUser, undefined>({
      async queryFn() {
        try {
          const response = await axios.delete(`${config.API_URL}/files/avatar`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
            withCredentials: true,
          })

          return { data: response.data }
        } catch (error: any) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message)
            return { error: error.response.data.message }
          } else {
            toast.error(error.message)
            return { error: error.message }
          }
        }
      },
    }),
  }),
})

export const { useLazyGetAllUsersQuery, useDeleteAvatarMutation, useUploadAvatarMutation } = userAPI
