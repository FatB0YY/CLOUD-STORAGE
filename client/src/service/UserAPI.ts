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
  }),
})

export const { useLazyGetAllUsersQuery } = userAPI
